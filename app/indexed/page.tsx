"use client"

import { useState, useEffect } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  id: z.string().optional(),
  period: z.string().optional(),
  name: z.string().optional(),
  region: z.string().optional(),
  type: z.string().optional(),
  target_account: z.string().optional(),
})

type Component = {
  id: string
  content: {
    title: string
    description: string
    category: string
    subcategory: string
    tags: string[]
  }
  metadata: {
    file: string
    exports: string[]
    dependencies?: string[]
    difficulty: string
  }
}

export default function IndexedPage() {
  const [components, setComponents] = useState<Component[]>([])
  const [open, setOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState('')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })

  useEffect(() => {
    async function fetchComponents() {
      try {
        const res = await fetch('/api/components')
        if (res.ok) {
          const data = await res.json()
          setComponents(data as Component[])
        } else {
          toast.error('Failed to load components')
        }
      } catch (error) {
        console.error('Error fetching components:', error)
        toast.error('Error loading components')
      }
    }
    fetchComponents()
  }, [])

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    let url = ''
    let method = 'GET'
    let body = null

    switch (currentAction) {
      case 'index':
        url = `/api/upstash/index?id=${data.id}`
        break
      case 'index-stats':
        url = `/api/upstash/index-stats?id=${data.id}&period=${data.period || '1d'}`
        break
      case 'create':
        url = '/api/upstash/create'
        method = 'POST'
        body = { name: data.name, region: data.region, type: data.type }
        break
      case 'reset-password':
        url = `/api/upstash/reset-password?id=${data.id}`
        method = 'POST'
        break
      case 'transfer':
        url = `/api/upstash/transfer?id=${data.id}`
        method = 'POST'
        body = { target_account: data.target_account }
        break
      case 'rename':
        url = `/api/upstash/rename?id=${data.id}`
        method = 'POST'
        body = { name: data.name }
        break
      case 'stats':
        url = '/api/upstash/stats'
        break
    }

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })
      const result = await res.json()
      if (res.ok) {
        toast.success(`${currentAction} success: ${JSON.stringify(result)}`)
      } else {
        toast.error(`Error: ${result.error}`)
      }
    } catch (error) {
      toast.error('Network error')
    }
    setOpen(false)
  }

  const handleDirectAction = async (action: string) => {
    let url = ''
    switch (action) {
      case 'list':
        url = '/api/upstash/list'
        break
      case 'stats':
        url = '/api/upstash/stats'
        break
    }
    try {
      const res = await fetch(url)
      const result = await res.json()
      if (res.ok) {
        toast.success(`${action} success: ${JSON.stringify(result)}`)
      } else {
        toast.error(`Error: ${result.error}`)
      }
    } catch (error) {
      toast.error('Network error')
    }
  }

  const handleAction = (action: string) => {
    setCurrentAction(action)
    setOpen(true)
    form.reset()
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1">
          {/* Left: Settings Panel */}
          <div className="w-96 border-r p-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-6">Upstash Search Management</h2>
            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">List Search Indexes</CardTitle>
                  <CardDescription>Get all your search indexes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleDirectAction('list')} className="w-full">
                    List Indexes
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Search Stats</CardTitle>
                  <CardDescription>Get overall search statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleDirectAction('stats')} className="w-full">
                    Get Stats
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Get Index</CardTitle>
                  <CardDescription>Retrieve details of a specific index</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleAction('index')} className="w-full">
                    Get Index
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Index Stats</CardTitle>
                  <CardDescription>Get statistics for a specific index</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleAction('index-stats')} className="w-full">
                    Get Index Stats
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Create Index</CardTitle>
                  <CardDescription>Create a new search index</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleAction('create')} className="w-full">
                    Create Index
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Reset Password</CardTitle>
                  <CardDescription>Reset the password for an index</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleAction('reset-password')} className="w-full">
                    Reset Password
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Transfer Index</CardTitle>
                  <CardDescription>Transfer index to another account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleAction('transfer')} className="w-full">
                    Transfer Index
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Rename Index</CardTitle>
                  <CardDescription>Rename an existing index</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleAction('rename')} className="w-full">
                    Rename Index
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Delete Index</CardTitle>
                  <CardDescription>Delete a search index</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => handleAction('delete')} className="w-full">
                    Delete Index
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                  <DialogHeader>
                <DialogTitle>{currentAction.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      {(currentAction === 'index' || currentAction === 'index-stats' || currentAction === 'reset-password' || currentAction === 'transfer' || currentAction === 'rename' || currentAction === 'delete') && (
                        <FormField control={form.control} name="id" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Index ID</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}
                      {currentAction === 'index-stats' && (
                        <FormField control={form.control} name="period" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Period</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select period" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1h">1h</SelectItem>
                                <SelectItem value="3h">3h</SelectItem>
                                <SelectItem value="12h">12h</SelectItem>
                                <SelectItem value="1d">1d</SelectItem>
                                <SelectItem value="3d">3d</SelectItem>
                                <SelectItem value="7d">7d</SelectItem>
                                <SelectItem value="30d">30d</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}
                      {(currentAction === 'create' || currentAction === 'rename') && (
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}
                      {currentAction === 'create' && (
                        <>
                          <FormField control={form.control} name="region" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Region</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select region" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="eu-west-1">eu-west-1</SelectItem>
                                  <SelectItem value="us-central1">us-central1</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                          <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem>
                              <FormLabel>Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="free">free</SelectItem>
                                  <SelectItem value="payg">payg</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )} />
                        </>
                      )}
                      {currentAction === 'transfer' && (
                        <FormField control={form.control} name="target_account" render={({ field }) => (
                          <FormItem>
                            <FormLabel>Target Account ID</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                      )}
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
            </DialogContent>
          </Dialog>
          {/* Right: Components Grid */}
          <div className="flex-1 p-6 overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Components Grid</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {components.map((component) => (
                <Card key={component.id} className="overflow-hidden">
                  <div className="aspect-video bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-500">Component Image</span>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-sm">{component.content.title}</CardTitle>
                    <CardDescription className="text-xs">{component.content.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground">Category: {component.content.category}</p>
                    <p className="text-xs text-muted-foreground">Difficulty: {component.metadata.difficulty}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
