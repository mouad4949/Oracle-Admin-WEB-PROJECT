'use client'

import { useState } from 'react'
import { RotateCcw, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useToast } from '../../components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export function RestoreOperations() {
  const [loading, setLoading] = useState(null)
  const [restoreDate, setRestoreDate] = useState('')
  const [operationStatus, setOperationStatus] = useState({})
  const { toast } = useToast()

  const handleRestore = async (type) => {
    setLoading(type)
    setOperationStatus(prev => ({ ...prev, [type]: 'Processing' }))
    try {
      const url = type === 'restoreByDate' 
        ? `http://localhost:8080/rman/restoreByDate?date=${restoreDate}`
        : `http://localhost:8080/rman/restore_recover`
      
      const response = await fetch(url)
      const data = await response.text()
      
      setOperationStatus(prev => ({ ...prev, [type]: 'Success' }))
      toast({
        title: 'Restore Successful',
        description: `Database restore completed successfully: ${data}`,
        className: 'bg-red-50 border-red-200',
      })
    } catch (error) {
      setOperationStatus(prev => ({ ...prev, [type]: 'Failed' }))
      toast({
        title: 'Restore Failed',
        description: 'There was an error performing the restore operation',
        variant: 'destructive',
      })
    }
    setLoading(null)
  }

  const renderButton = (type, label) => (
    <Button 
      className="w-full bg-red-700 hover:bg-red-800"
      onClick={() => handleRestore(type)}
      disabled={!!loading || (type === 'restoreByDate' && !restoreDate)}
    >
      {loading === type ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        label
      )}
    </Button>
  )

  const renderStatus = (type) => {
    const status = operationStatus[type]
    if (!status) return null
    const color = status === 'Success' ? 'text-green-600' : 'text-red-600'
    return <p className={`mt-2 text-sm ${color}`}>{status}</p>
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <RotateCcw className="h-5 w-5" />
            Restore and Recover
          </CardTitle>
          <CardDescription>
            Restore and recover the database to the latest state
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderButton('restore_recover', 'Start Restore')}
          {renderStatus('restore_recover')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Calendar className="h-5 w-5" />
            Point-in-Time Recovery
          </CardTitle>
          <CardDescription>
            Restore database to a specific point in time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            type="text"
            placeholder="YYYY-MM-DD HH24:MI:SS"
            value={restoreDate}
            onChange={(e) => setRestoreDate(e.target.value)}
            className="border-red-200 focus:ring-red-700"
          />
          {renderButton('restoreByDate', 'Restore to Point-in-Time')}
          {renderStatus('restoreByDate')}
        </CardContent>
      </Card>
    </div>
  )
}

