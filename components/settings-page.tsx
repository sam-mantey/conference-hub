"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Calendar, Users, Shield, Database, Mail } from "lucide-react"

export function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [autoApproval, setAutoApproval] = useState(false)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure system settings, booking policies, and integrations.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="booking">Booking</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic system configuration and company information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="ConferenceHub Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Admin Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@conferencehub.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                      <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                      <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                      <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select defaultValue="mm-dd-yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Company Address</Label>
                <Textarea
                  id="company-address"
                  defaultValue="123 Business Ave, Suite 100, New York, NY 10001"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenance-mode" checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                <Badge variant={maintenanceMode ? "destructive" : "secondary"}>
                  {maintenanceMode ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="booking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Booking Policies
              </CardTitle>
              <CardDescription>Configure booking rules, restrictions, and approval workflows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="advance-booking">Maximum Advance Booking (days)</Label>
                  <Input id="advance-booking" type="number" defaultValue="30" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-duration">Minimum Booking Duration (minutes)</Label>
                  <Input id="min-duration" type="number" defaultValue="30" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="max-duration">Maximum Booking Duration (hours)</Label>
                  <Input id="max-duration" type="number" defaultValue="8" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cancellation-window">Cancellation Window (hours)</Label>
                  <Input id="cancellation-window" type="number" defaultValue="2" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Approval Settings</h4>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-approval" checked={autoApproval} onCheckedChange={setAutoApproval} />
                  <Label htmlFor="auto-approval">Auto-approve bookings</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approval-required">Require approval for bookings longer than (hours)</Label>
                  <Input id="approval-required" type="number" defaultValue="4" />
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Recurring Bookings</h4>
                <div className="space-y-2">
                  <Label htmlFor="max-recurring">Maximum recurring instances</Label>
                  <Input id="max-recurring" type="number" defaultValue="52" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recurring-approval">Recurring booking approval</Label>
                  <Select defaultValue="first-only">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first-only">Approve first instance only</SelectItem>
                      <SelectItem value="all-instances">Approve each instance</SelectItem>
                      <SelectItem value="series-approval">Approve entire series</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>Configure how and when users receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                  <Label htmlFor="email-notifications">Enable email notifications</Label>
                </div>
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="booking-confirmation" defaultChecked />
                    <Label htmlFor="booking-confirmation">Booking confirmations</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="booking-reminders" defaultChecked />
                    <Label htmlFor="booking-reminders">Booking reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="cancellation-notices" defaultChecked />
                    <Label htmlFor="cancellation-notices">Cancellation notices</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="approval-requests" defaultChecked />
                    <Label htmlFor="approval-requests">Approval requests</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">SMS Notifications</h4>
                <div className="flex items-center space-x-2">
                  <Switch id="sms-notifications" checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  <Label htmlFor="sms-notifications">Enable SMS notifications</Label>
                </div>
                <div className="grid grid-cols-2 gap-4 ml-6">
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-reminders" />
                    <Label htmlFor="sms-reminders">Booking reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sms-urgent" />
                    <Label htmlFor="sms-urgent">Urgent notifications only</Label>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Reminder Timing</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-reminder">First reminder (hours before)</Label>
                    <Input id="first-reminder" type="number" defaultValue="24" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="second-reminder">Second reminder (minutes before)</Label>
                    <Input id="second-reminder" type="number" defaultValue="15" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>Configure user roles, permissions, and access controls.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">Default User Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-role">Default Role for New Users</Label>
                    <Select defaultValue="employee">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-concurrent">Max Concurrent Bookings</Label>
                    <Input id="max-concurrent" type="number" defaultValue="3" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Role Permissions</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Admin</div>
                      <div className="text-sm text-muted-foreground">Full system access</div>
                    </div>
                    <Badge className="bg-red-100 text-red-800">Full Access</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Manager</div>
                      <div className="text-sm text-muted-foreground">Department management</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">Limited Admin</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Employee</div>
                      <div className="text-sm text-muted-foreground">Standard booking access</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Standard</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Guest</div>
                      <div className="text-sm text-muted-foreground">Limited booking access</div>
                    </div>
                    <Badge className="bg-gray-100 text-gray-800">Restricted</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Integrations
              </CardTitle>
              <CardDescription>Connect with external services and calendar systems.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">Calendar Integration</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Microsoft Outlook</div>
                        <div className="text-sm text-muted-foreground">Sync with Outlook calendars</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Connected</Badge>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-red-600" />
                      </div>
                      <div>
                        <div className="font-medium">Google Calendar</div>
                        <div className="text-sm text-muted-foreground">Sync with Google Workspace</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Not Connected</Badge>
                      <Button variant="outline" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Authentication Providers</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Shield className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Active Directory</div>
                        <div className="text-sm text-muted-foreground">Corporate SSO integration</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <Button variant="outline" size="sm">
                        Settings
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">SAML 2.0</div>
                        <div className="text-sm text-muted-foreground">Enterprise identity provider</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Available</Badge>
                      <Button variant="outline" size="sm">
                        Setup
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Configuration
              </CardTitle>
              <CardDescription>Advanced system settings and maintenance options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h4 className="font-medium">Database Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Backup Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="retention-period">Data Retention (months)</Label>
                    <Input id="retention-period" type="number" defaultValue="24" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">Performance Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cache-duration">Cache Duration (minutes)</Label>
                    <Input id="cache-duration" type="number" defaultValue="15" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (hours)</Label>
                    <Input id="session-timeout" type="number" defaultValue="8" />
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h4 className="font-medium">System Maintenance</h4>
                <div className="flex gap-2">
                  <Button variant="outline">Run System Check</Button>
                  <Button variant="outline">Clear Cache</Button>
                  <Button variant="outline">Export Logs</Button>
                  <Button variant="destructive">Reset to Defaults</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset Changes</Button>
        <Button>Save All Settings</Button>
      </div>
    </div>
  )
}
