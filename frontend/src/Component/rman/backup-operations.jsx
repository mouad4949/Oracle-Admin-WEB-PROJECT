'use client'

import { useState } from 'react'
import { Database, RefreshCw, Archive } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { useToast } from '../../components/ui/use-toast'
import { Loader2 } from 'lucide-react'

export function BackupOperations() {
  const [loading, setLoading] = useState(null)
  const [operationStatus, setOperationStatus] = useState({})
  const { toast } = useToast()

  const handleBackup = async (type) => {
    setLoading(type)
    setOperationStatus(prev => ({ ...prev, [type]: 'Processing' }))
    try {
      const response = await fetch(`http://localhost:8080/rman/${type}`)
      const data = await response.text()
      
      setOperationStatus(prev => ({ ...prev, [type]: 'Success' }))
      toast({
        title: 'Backup Successful',
        description: `${type} completed successfully: ${data}`,
        className: 'bg-red-50 border-red-200',
      })
    } catch (error) {
      setOperationStatus(prev => ({ ...prev, [type]: 'Failed' }))
      toast({
        title: 'Backup Failed',
        description: 'There was an error performing the backup operation',
        variant: 'destructive',
      })
    }
    setLoading(null)
  }

  const renderButton = (type, label) => (
    <Button 
      className="w-full bg-red-700 hover:bg-red-800"
      onClick={() => handleBackup(type)}
      disabled={!!loading}
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
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Archive className="h-5 w-5" />
            Full Backup
          </CardTitle>
          <CardDescription>
            Perform a complete backup of the database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderButton('fullBackup', 'Start Full Backup')}
          {renderStatus('fullBackup')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <RefreshCw className="h-5 w-5" />
            Incremental Backup
          </CardTitle>
          <CardDescription>
            Backup changes since last backup
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderButton('incrementalBackup', 'Start Incremental Backup')}
          {renderStatus('incrementalBackup')}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Database className="h-5 w-5" />
            PDB Backup
          </CardTitle>
          <CardDescription>
            Backup pluggable database
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderButton('backup-pdb', 'Start PDB Backup')}
          {renderStatus('backup-pdb')}
        </CardContent>
      </Card>
    </div>
  )
}

