"use client"

import Link from "next/link"
import { Book, CheckCircle, Menu, Upload } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadSuccessPage() {
  const router = useRouter()

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
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">อัพโหลดสำเร็จ!</CardTitle>
            <CardDescription>เอกสารของคุณถูกอัพโหลดเรียบร้อยแล้ว</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">ขอบคุณสำหรับการแบ่งปันเอกสาร เอกสารของคุณจะช่วยให้ผู้อื่นได้เรียนรู้และพัฒนาตนเอง</p>
            <p className="text-sm text-muted-foreground">เอกสารของคุณจะถูกตรวจสอบโดยทีมงานก่อนที่จะแสดงบนเว็บไซต์</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={() => router.push("/upload")}>
              <Upload className="h-4 w-4 mr-2" />
              อัพโหลดเอกสารเพิ่มเติม
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">กลับสู่หน้าหลัก</Link>
            </Button>
          </CardFooter>
        </Card>
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
    </div>
  )
}

