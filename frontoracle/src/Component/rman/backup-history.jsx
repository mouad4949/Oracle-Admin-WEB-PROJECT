'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../../../../s3/react/frontoracle/src/components/ui/table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../../../s3/react/frontoracle/src/components/ui/card'
import { Loader2 } from 'lucide-react'

export function BackupHistory() {
  const [backups, setBackups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBackups = async () => {
      try {
        const response = await fetch('http://localhost:8080/rman/list_Backup')
        const data = await response.json()
        setBackups(data.Backups || [])
      } catch (error) {
        console.error('Failed to fetch backups:', error)
      }
      setLoading(false)
    }

    fetchBackups()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-700">Backup History</CardTitle>
        <CardDescription>
          List of all database backups and their status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-red-700">Key</TableHead>
              <TableHead className="text-red-700">Type</TableHead>
              <TableHead className="text-red-700">Level</TableHead>
              <TableHead className="text-red-700">Status</TableHead>
              <TableHead className="text-red-700">Device Type</TableHead>
              <TableHead className="text-red-700">Completion Time</TableHead>
              <TableHead className="text-red-700">Tag</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                  Loading...
                </TableCell>
              </TableRow>
            ) : backups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No backup history found</TableCell>
              </TableRow>
            ) : (
              backups.map((backup, index) => (
                <TableRow key={index}>
                  <TableCell>{backup.Key}</TableCell>
                  <TableCell>{backup.Type}</TableCell>
                  <TableCell>{backup.Level}</TableCell>
                  <TableCell>{backup.Status}</TableCell>
                  <TableCell>{backup.DeviceType}</TableCell>
                  <TableCell>{backup.CompletionTime}</TableCell>
                  <TableCell>{backup.Tag}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

