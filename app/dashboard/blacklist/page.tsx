"use client"

import React, { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { BlacklistTable } from "@/components/dashboard/blacklist-table"
import { BlacklistForm } from "@/components/dashboard/blacklist-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, Building, Globe, Mail, FileText, Plus } from "lucide-react"
import { BlacklistType } from "@/lib/types"

export default function BlacklistPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<BlacklistType | 'all'>('all')
  const [showForm, setShowForm] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Only allow admin users to access this page
  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You need administrator privileges to access this page.</p>
        </div>
      </div>
    )
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setRefreshTrigger(prev => prev + 1)
  }

  const tabs = [
    { value: 'all', label: 'All', icon: Shield },
    { value: 'user', label: 'Users', icon: Users },
    { value: 'property', label: 'Properties', icon: Building },
    { value: 'ip', label: 'IP Addresses', icon: Globe },
    { value: 'email_domain', label: 'Email Domains', icon: Mail },
    { value: 'content', label: 'Content Filters', icon: FileText }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blacklist Management</h1>
          <p className="text-muted-foreground">
            Manage blocked users, properties, IP addresses, and content filters
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Blacklist Entry
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as BlacklistType | 'all')}>
        <TabsList className="grid w-full grid-cols-6">
          {tabs.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="gap-2">
              <Icon className="h-4 w-4" />
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map(({ value }) => (
          <TabsContent key={value} value={value} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {tabs.find(tab => tab.value === value)?.icon &&
                    React.createElement(tabs.find(tab => tab.value === value)!.icon, {
                      className: "h-5 w-5"
                    })
                  }
                  {value === 'all' ? 'All Blacklist Entries' :
                   value === 'user' ? 'User Blacklist' :
                   value === 'property' ? 'Property Blacklist' :
                   value === 'ip' ? 'IP Address Blacklist' :
                   value === 'email_domain' ? 'Email Domain Blacklist' :
                   'Content Filters'}
                </CardTitle>
                <CardDescription>
                  {value === 'all' && 'View and manage all types of blacklist entries'}
                  {value === 'user' && 'Block users from accessing the platform'}
                  {value === 'property' && 'Prevent properties from being listed or searched'}
                  {value === 'ip' && 'Block IP addresses from accessing the platform'}
                  {value === 'email_domain' && 'Block entire email domains from registration'}
                  {value === 'content' && 'Filter out prohibited words and phrases from content'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BlacklistTable
                  type={value === 'all' ? undefined : value as BlacklistType}
                  refreshTrigger={refreshTrigger}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {showForm && (
        <BlacklistForm
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  )
}
