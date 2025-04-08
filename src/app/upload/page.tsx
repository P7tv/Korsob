"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Book, Cloud, File, FileText, Loader2, Menu, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function UploadPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [documentType, setDocumentType] = useState("exam")
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    year: "",
    semester: "1",
    description: "",
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files)
      setUploadedFiles([...uploadedFiles, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (uploadedFiles.length === 0) {
      toast({
        title: "ไม่พบไฟล์",
        description: "กรุณาอัพโหลดไฟล์อย่างน้อย 1 ไฟล์",
        variant: "destructive",
      })
      return
    }

    if (!formData.title || !formData.subject || !formData.year) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      toast({
        title: "อัพโหลดสำเร็จ",
        description: "เอกสารของคุณถูกอัพโหลดเรียบร้อยแล้ว",
      })

      // Reset form
      setUploadedFiles([])
      setFormData({
        title: "",
        subject: "",
        year: "",
        semester: "1",
        description: "",
      })

      // In a real application, you would submit the files and form data to your backend here
      // Then redirect to a success page or the document listing page
      router.push("/upload/success")
    }, 2000)
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
            <Link href="/upload" className="font-medium">
              อัพโหลดเอกสาร
            </Link>
            <Link href="/about" className="text-muted-foreground">
              เกี่ยวกับเรา
            </Link>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter">อัพโหลดเอกสาร</h1>
              <p className="text-muted-foreground">แบ่งปันข้อสอบหรือสรุปเนื้อหาให้กับผู้อื่น</p>
            </div>
          </div>

          <Tabs defaultValue="upload" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">อัพโหลดเอกสาร</TabsTrigger>
              <TabsTrigger value="my-uploads">เอกสารของฉัน</TabsTrigger>
            </TabsList>
            <TabsContent value="upload">
              <Card>
                <CardHeader>
                  <CardTitle>อัพโหลดเอกสาร</CardTitle>
                  <CardDescription>อัพโหลดข้อสอบหรือสรุปเนื้อหาเพื่อแบ่งปันให้กับผู้อื่น</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant={documentType === "exam" ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => setDocumentType("exam")}
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            ข้อสอบ
                          </Button>
                          <Button
                            type="button"
                            variant={documentType === "summary" ? "default" : "outline"}
                            className="flex-1"
                            onClick={() => setDocumentType("summary")}
                          >
                            <File className="h-4 w-4 mr-2" />
                            สรุปเนื้อหา
                          </Button>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="title">
                          ชื่อเอกสาร <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder={
                            documentType === "exam" ? "เช่น ข้อสอบกลางภาค วิชาคณิตศาสตร์" : "เช่น สรุปเนื้อหาบทที่ 1 วิชาฟิสิกส์"
                          }
                          value={formData.title}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="subject">
                            วิชา <span className="text-red-500">*</span>
                          </Label>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) => handleSelectChange("subject", value)}
                          >
                            <SelectTrigger id="subject">
                              <SelectValue placeholder="เลือกวิชา" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="math">คณิตศาสตร์</SelectItem>
                              <SelectItem value="physics">ฟิสิกส์</SelectItem>
                              <SelectItem value="chemistry">เคมี</SelectItem>
                              <SelectItem value="biology">ชีววิทยา</SelectItem>
                              <SelectItem value="thai">ภาษาไทย</SelectItem>
                              <SelectItem value="english">ภาษาอังกฤษ</SelectItem>
                              <SelectItem value="social">สังคมศึกษา</SelectItem>
                              <SelectItem value="computer">คอมพิวเตอร์</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-2">
                          <Label htmlFor="year">
                            ปีการศึกษา <span className="text-red-500">*</span>
                          </Label>
                          <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                            <SelectTrigger id="year">
                              <SelectValue placeholder="เลือกปีการศึกษา" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2566">2566</SelectItem>
                              <SelectItem value="2565">2565</SelectItem>
                              <SelectItem value="2564">2564</SelectItem>
                              <SelectItem value="2563">2563</SelectItem>
                              <SelectItem value="2562">2562</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {documentType === "exam" && (
                        <div className="grid gap-2">
                          <Label htmlFor="semester">ภาคเรียน</Label>
                          <Select
                            value={formData.semester}
                            onValueChange={(value) => handleSelectChange("semester", value)}
                          >
                            <SelectTrigger id="semester">
                              <SelectValue placeholder="เลือกภาคเรียน" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">ภาคเรียนที่ 1</SelectItem>
                              <SelectItem value="2">ภาคเรียนที่ 2</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      <div className="grid gap-2">
                        <Label htmlFor="description">คำอธิบายเพิ่มเติม</Label>
                        <Textarea
                          id="description"
                          name="description"
                          placeholder="รายละเอียดเพิ่มเติมเกี่ยวกับเอกสาร"
                          value={formData.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>
                          อัพโหลดไฟล์ <span className="text-red-500">*</span>
                        </Label>
                        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                          <Cloud className="h-10 w-10 text-muted-foreground mb-2" />
                          <p className="mb-2 text-sm text-muted-foreground">ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์</p>
                          <p className="text-xs text-muted-foreground mb-4">
                            รองรับไฟล์ PDF, DOC, DOCX, PPT, PPTX ขนาดไม่เกิน 10MB
                          </p>
                          <Input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept=".pdf,.doc,.docx,.ppt,.pptx"
                            multiple
                            onChange={handleFileChange}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById("file-upload")?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            เลือกไฟล์
                          </Button>
                        </div>
                      </div>

                      {uploadedFiles.length > 0 && (
                        <div className="grid gap-2">
                          <Label>ไฟล์ที่เลือก ({uploadedFiles.length})</Label>
                          <div className="border rounded-lg divide-y">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-3">
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm truncate max-w-[200px] md:max-w-[400px]">{file.name}</span>
                                  <span className="text-xs text-muted-foreground">
                                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                  </span>
                                </div>
                                <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)}>
                                  <X className="h-4 w-4" />
                                  <span className="sr-only">ลบไฟล์</span>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => router.push("/")}>
                    ยกเลิก
                  </Button>
                  <Button onClick={handleSubmit} disabled={isUploading}>
                    {isUploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        กำลังอัพโหลด...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        อัพโหลด
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="my-uploads">
              <Card>
                <CardHeader>
                  <CardTitle>เอกสารของฉัน</CardTitle>
                  <CardDescription>รายการเอกสารที่คุณได้อัพโหลดไว้</CardDescription>
                </CardHeader>
                <CardContent>
                  {myUploads.length > 0 ? (
                    <div className="grid gap-4">
                      {myUploads.map((upload) => (
                        <div key={upload.id} className="flex items-center justify-between border rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            {upload.type === "exam" ? (
                              <FileText className="h-8 w-8 text-primary shrink-0" />
                            ) : (
                              <File className="h-8 w-8 text-primary shrink-0" />
                            )}
                            <div>
                              <h3 className="font-medium">{upload.title}</h3>
                              <p className="text-sm text-muted-foreground">
                                {getSubjectName(upload.subject)} • ปีการศึกษา {upload.year}
                                {upload.type === "exam" && ` • ภาคเรียนที่ ${upload.semester}`}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">อัพโหลดเมื่อ {upload.uploadedAt}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              แก้ไข
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                              ลบ
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">ยังไม่มีเอกสารที่อัพโหลด</h3>
                      <p className="text-muted-foreground mb-4">คุณยังไม่ได้อัพโหลดเอกสารใดๆ เริ่มแบ่งปันเอกสารกับผู้อื่นได้เลย</p>
                      <Button onClick={() => document.querySelector('[data-value="upload"]')?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        อัพโหลดเอกสาร
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
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

// Helper function to get subject name from subject ID
function getSubjectName(subjectId: string): string {
  const subjects: Record<string, string> = {
    math: "คณิตศาสตร์",
    physics: "ฟิสิกส์",
    chemistry: "เคมี",
    biology: "ชีววิทยา",
    thai: "ภาษาไทย",
    english: "ภาษาอังกฤษ",
    social: "สังคมศึกษา",
    computer: "คอมพิวเตอร์",
  }
  return subjects[subjectId] || subjectId
}

// Mock data for my uploads
const myUploads = [
  {
    id: 1,
    type: "exam",
    title: "ข้อสอบกลางภาค วิชาคณิตศาสตร์",
    subject: "math",
    year: "2566",
    semester: "1",
    uploadedAt: "12 มี.ค. 2566",
  },
  {
    id: 2,
    type: "summary",
    title: "สรุปเนื้อหาบทที่ 1 วิชาฟิสิกส์",
    subject: "physics",
    year: "2566",
    uploadedAt: "5 ก.พ. 2566",
  },
  {
    id: 3,
    type: "exam",
    title: "ข้อสอบปลายภาค วิชาภาษาอังกฤษ",
    subject: "english",
    year: "2565",
    semester: "2",
    uploadedAt: "20 ต.ค. 2565",
  },
]

