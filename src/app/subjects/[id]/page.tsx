import Link from "next/link"
import { ArrowLeft, Book, Download, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function SubjectDetailPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the subject data based on the ID
  const subject = allSubjects.find((s) => s.id === params.id) || allSubjects[0]

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
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="/subjects">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">กลับ</span>
                </Link>
              </Button>
              <h1 className="text-3xl font-bold">{subject.name}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {subject.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>ข้อมูลวิชา</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">คำอธิบาย</h3>
                    <p className="text-sm text-muted-foreground">{subject.description}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ข้อสอบ:</span>
                      <span>{subject.exams} ชุด</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">สรุปเนื้อหา:</span>
                      <span>{subject.summaries} ไฟล์</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">ปีการศึกษาล่าสุด:</span>
                      <span>{subject.latestYear}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-3">
              <Tabs defaultValue="exams">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="exams">ข้อสอบ</TabsTrigger>
                  <TabsTrigger value="summaries">สรุปเนื้อหา</TabsTrigger>
                </TabsList>
                <TabsContent value="exams" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>ข้อสอบทั้งหมด</CardTitle>
                      <CardDescription>ข้อสอบเก่าตามปีการศึกษา</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ปีการศึกษา</TableHead>
                            <TableHead>ภาคเรียน</TableHead>
                            <TableHead>ชื่อข้อสอบ</TableHead>
                            <TableHead className="text-right">ดาวน์โหลด</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {examData.map((exam) => (
                            <TableRow key={exam.id}>
                              <TableCell>{exam.year}</TableCell>
                              <TableCell>{exam.semester}</TableCell>
                              <TableCell>{exam.title}</TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-2" />
                                  ดาวน์โหลด
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="summaries" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>สรุปเนื้อหาทั้งหมด</CardTitle>
                      <CardDescription>สรุปเนื้อหาตามบทเรียน</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {summaryData.map((summary) => (
                          <Card key={summary.id}>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">{summary.title}</CardTitle>
                              <CardDescription className="text-xs">อัพเดทล่าสุด: {summary.updatedAt}</CardDescription>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <p className="text-sm text-muted-foreground">{summary.description}</p>
                            </CardContent>
                            <CardFooter>
                              <Button variant="outline" size="sm" className="w-full">
                                <Download className="h-4 w-4 mr-2" />
                                ดาวน์โหลด
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
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
    </div>
  )
}

const allSubjects = [
  {
    id: "math",
    name: "คณิตศาสตร์",
    description: "พีชคณิต เรขาคณิต แคลคูลัส และสถิติ",
    tags: ["พีชคณิต", "เรขาคณิต", "แคลคูลัส", "สถิติ"],
    exams: 24,
    summaries: 12,
    latestYear: "2566",
  },
  {
    id: "physics",
    name: "ฟิสิกส์",
    description: "กลศาสตร์ ไฟฟ้า แม่เหล็ก และคลื่น",
    tags: ["กลศาสตร์", "ไฟฟ้า", "แม่เหล็ก", "คลื่น"],
    exams: 18,
    summaries: 10,
    latestYear: "2566",
  },
]

const examData = [
  { id: 1, year: "2566", semester: "1", title: "ข้อสอบกลางภาค" },
  { id: 2, year: "2566", semester: "1", title: "ข้อสอบปลายภาค" },
  { id: 3, year: "2566", semester: "2", title: "ข้อสอบกลางภาค" },
  { id: 4, year: "2566", semester: "2", title: "ข้อสอบปลายภาค" },
  { id: 5, year: "2565", semester: "1", title: "ข้อสอบกลางภาค" },
  { id: 6, year: "2565", semester: "1", title: "ข้อสอบปลายภาค" },
  { id: 7, year: "2565", semester: "2", title: "ข้อสอบกลางภาค" },
  { id: 8, year: "2565", semester: "2", title: "ข้อสอบปลายภาค" },
]

const summaryData = [
  {
    id: 1,
    title: "บทที่ 1: พื้นฐานและหลักการ",
    description: "สรุปเนื้อหาพื้นฐานและหลักการสำคัญของวิชา",
    updatedAt: "10 มี.ค. 2566",
  },
  {
    id: 2,
    title: "บทที่ 2: ทฤษฎีและแนวคิด",
    description: "สรุปทฤษฎีและแนวคิดหลักที่สำคัญในการเรียนรู้",
    updatedAt: "15 มี.ค. 2566",
  },
  {
    id: 3,
    title: "บทที่ 3: การประยุกต์ใช้",
    description: "สรุปการประยุกต์ใช้ทฤษฎีในสถานการณ์ต่างๆ",
    updatedAt: "22 มี.ค. 2566",
  },
  {
    id: 4,
    title: "บทที่ 4: แบบฝึกหัดและเฉลย",
    description: "รวมแบบฝึกหัดพร้อมเฉลยละเอียด",
    updatedAt: "30 มี.ค. 2566",
  },
]

