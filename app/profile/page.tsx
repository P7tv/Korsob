"use client"

import { useState } from "react"
import Link from "next/link"
import { Book, FileText, Loader2, LogOut, Menu, Settings, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DocumentCard } from "@/components/document-card"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function ProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Mock user data - in a real app, this would come from your auth system
  const user = {
    id: "1",
    name: "ธนพล สมศักดิ์",
    email: "thanaphon@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinDate: "15 ม.ค. 2566",
    uploadCount: 12,
    downloadCount: 87,
  }

  const handleLogout = () => {
    setIsLoading(true)

    // Simulate logout process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "ออกจากระบบสำเร็จ",
      })
      router.push("/")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Book className="h-6 w-6" />
            <span className="text-xl">ExamArchive</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-muted-foreground">
              หน้าหลัก
            </Link>
            <Link href="/subjects" className="text-muted-foreground">
              วิชาทั้งหมด
            </Link>
            <Link href="/upload" className="text-muted-foreground">
              อัพโหลดเอกสาร
            </Link>
            <Link href="/about" className="text-muted-foreground">
              เกี่ยวกับเรา
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <span className="sr-only">Toggle menu</span>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground">สมาชิกตั้งแต่ {user.joinDate}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <Link href="/profile/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  ตั้งค่าโปรไฟล์
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    ออกจากระบบ
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">เอกสารที่อัพโหลด</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.uploadCount}</div>
                <p className="text-xs text-muted-foreground">เอกสาร</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">การดาวน์โหลด</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.downloadCount}</div>
                <p className="text-xs text-muted-foreground">ครั้ง</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">คะแนนเฉลี่ย</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">จาก 5 คะแนน</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">รีวิว</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">รีวิว</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="my-uploads" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-uploads">เอกสารของฉัน</TabsTrigger>
              <TabsTrigger value="saved">เอกสารที่บันทึกไว้</TabsTrigger>
              <TabsTrigger value="history">ประวัติการดาวน์โหลด</TabsTrigger>
            </TabsList>
            <TabsContent value="my-uploads" className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">เอกสารที่ฉันอัพโหลด</h2>
                <Button asChild>
                  <Link href="/upload">
                    <Upload className="h-4 w-4 mr-2" />
                    อัพโหลดเอกสารใหม่
                  </Link>
                </Button>
              </div>
              {myUploads.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {myUploads.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      id={doc.id}
                      type={doc.type}
                      title={doc.title}
                      subject={doc.subject}
                      subjectName={doc.subjectName}
                      year={doc.year}
                      semester={doc.semester}
                      uploadedAt={doc.uploadedAt}
                      description={doc.description}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">ยังไม่มีเอกสารที่อัพโหลด</h3>
                  <p className="text-muted-foreground mb-4">คุณยังไม่ได้อัพโหลดเอกสารใดๆ เริ่มแบ่งปันเอกสารกับผู้อื่นได้เลย</p>
                  <Button asChild>
                    <Link href="/upload">
                      <Upload className="h-4 w-4 mr-2" />
                      อัพโหลดเอกสาร
                    </Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="saved" className="mt-6">
              <h2 className="text-xl font-bold mb-4">เอกสารที่บันทึกไว้</h2>
              {savedDocuments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedDocuments.map((doc) => (
                    <DocumentCard
                      key={doc.id}
                      id={doc.id}
                      type={doc.type}
                      title={doc.title}
                      subject={doc.subject}
                      subjectName={doc.subjectName}
                      year={doc.year}
                      semester={doc.semester}
                      uploadedAt={doc.uploadedAt}
                      uploadedBy={doc.uploadedBy}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">ยังไม่มีเอกสารที่บันทึกไว้</h3>
                  <p className="text-muted-foreground mb-4">คุณยังไม่ได้บันทึกเอกสารใดๆ ไว้ในรายการโปรด</p>
                  <Button asChild>
                    <Link href="/subjects">ค้นหาเอกสาร</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <h2 className="text-xl font-bold mb-4">ประวัติการดาวน์โหลด</h2>
              {downloadHistory.length > 0 ? (
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted">
                        <th className="text-left p-3">เอกสาร</th>
                        <th className="text-left p-3 hidden md:table-cell">วิชา</th>
                        <th className="text-left p-3 hidden md:table-cell">ปีการศึกษา</th>
                        <th className="text-left p-3">วันที่ดาวน์โหลด</th>
                        <th className="text-right p-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {downloadHistory.map((item) => (
                        <tr key={item.id}>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <span className="font-medium">{item.title}</span>
                            </div>
                          </td>
                          <td className="p-3 hidden md:table-cell">{item.subjectName}</td>
                          <td className="p-3 hidden md:table-cell">{item.year}</td>
                          <td className="p-3">{item.downloadedAt}</td>
                          <td className="p-3 text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/documents/${item.documentId}`}>ดูเอกสาร</Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">ยังไม่มีประวัติการดาวน์โหลด</h3>
                  <p className="text-muted-foreground mb-4">คุณยังไม่ได้ดาวน์โหลดเอกสารใดๆ</p>
                  <Button asChild>
                    <Link href="/subjects">ค้นหาเอกสาร</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} ExamArchive. สงวนลิขสิทธิ์.</p>
          <nav className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/terms" className="hover:underline">
              ข้อกำหนดการใช้งาน
            </Link>
            <Link href="/privacy" className="hover:underline">
              นโยบายความเป็นส่วนตัว
            </Link>
          </nav>
        </div>
      </footer>
      <Toaster />
    </div>
  )
}

// Mock data for my uploads
const myUploads = [
  {
    id: "1",
    type: "exam" as const,
    title: "ข้อสอบกลางภาค วิชาคณิตศาสตร์",
    subject: "math",
    subjectName: "คณิตศาสตร์",
    year: "2566",
    semester: "1",
    uploadedAt: "12 มี.ค. 2566 (14:30 น.)",
    description: "ข้อสอบกลางภาคเรียนที่ 1 วิชาคณิตศาสตร์ ปีการศึกษา 2566 ครอบคลุมเนื้อหาบทที่ 1-5",
  },
  {
    id: "2",
    type: "summary" as const,
    title: "สรุปเนื้อหาบทที่ 1 วิชาฟิสิกส์",
    subject: "physics",
    subjectName: "ฟิสิกส์",
    year: "2566",
    uploadedAt: "5 ก.พ. 2566 (10:15 น.)",
    description: "สรุปเนื้อหาบทที่ 1 เรื่องกลศาสตร์ วิชาฟิสิกส์",
  },
  {
    id: "3",
    type: "exam" as const,
    title: "ข้อสอบปลายภาค วิชาภาษาอังกฤษ",
    subject: "english",
    subjectName: "ภาษาอังกฤษ",
    year: "2565",
    semester: "2",
    uploadedAt: "20 ต.ค. 2565 (16:45 น.)",
    description: "ข้อสอบปลายภาคเรียนที่ 2 วิชาภาษาอังกฤษ ปีการศึกษา 2565",
  },
]

// Mock data for saved documents
const savedDocuments = [
  {
    id: "4",
    type: "exam" as const,
    title: "ข้อสอบกลางภาค วิชาเคมี",
    subject: "chemistry",
    subjectName: "เคมี",
    year: "2566",
    semester: "1",
    uploadedAt: "8 มี.ค. 2566 (09:20 น.)",
    uploadedBy: "สมชาย ใจดี",
  },
  {
    id: "5",
    type: "summary" as const,
    title: "สรุปเนื้อหาวิชาประวัติศาสตร์",
    subject: "social",
    subjectName: "สังคมศึกษา",
    year: "2566",
    uploadedAt: "2 ก.พ. 2566 (13:40 น.)",
    uploadedBy: "วิชัย รักเรียน",
  },
]

// Mock data for download history
const downloadHistory = [
  {
    id: "1",
    documentId: "4",
    title: "ข้อสอบกลางภาค วิชาเคมี",
    subjectName: "เคมี",
    year: "2566",
    downloadedAt: "15 มี.ค. 2566 (10:30 น.)",
  },
  {
    id: "2",
    documentId: "5",
    title: "สรุปเนื้อหาวิชาประวัติศาสตร์",
    subjectName: "สังคมศึกษา",
    year: "2566",
    downloadedAt: "10 มี.ค. 2566 (14:15 น.)",
  },
  {
    id: "3",
    documentId: "6",
    title: "ข้อสอบปลายภาค วิชาชีววิทยา",
    subjectName: "ชีววิทยา",
    year: "2565",
    downloadedAt: "5 มี.ค. 2566 (16:45 น.)",
  },
]

