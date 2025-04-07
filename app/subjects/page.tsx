import Link from "next/link"
import { Book, FileText, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubjectsPage() {
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
            <Link href="/subjects" className="font-medium">
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
        <section className="w-full py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter">วิชาทั้งหมด</h1>
                <p className="text-muted-foreground">ค้นหาและเลือกดูข้อสอบและสรุปเนื้อหาตามวิชาที่ต้องการ</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="w-full md:w-auto">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="ปีการศึกษา" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทุกปีการศึกษา</SelectItem>
                      <SelectItem value="2566">2566</SelectItem>
                      <SelectItem value="2565">2565</SelectItem>
                      <SelectItem value="2564">2564</SelectItem>
                      <SelectItem value="2563">2563</SelectItem>
                      <SelectItem value="2562">2562</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex w-full md:w-auto">
                  <Input type="search" placeholder="ค้นหาวิชา..." className="w-full md:w-auto" />
                  <Button type="submit" variant="ghost" className="px-2">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">ค้นหา</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allSubjects.map((subject) => (
                <Card key={subject.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                        <FileText className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle>{subject.name}</CardTitle>
                    </div>
                    <CardDescription>{subject.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {subject.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ข้อสอบ:</span>
                        <span>{subject.exams} ชุด</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">สรุปเนื้อหา:</span>
                        <span>{subject.summaries} ไฟล์</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">ปีการศึกษาล่าสุด:</span>
                        <span>{subject.latestYear}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/subjects/${subject.id}`}>ดูรายละเอียด</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8 md:py-12">
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-2 font-semibold">
              <Book className="h-6 w-6" />
              <span className="text-xl">ExamArchive</span>
            </div>
            <p className="text-sm text-muted-foreground">แหล่งรวมข้อสอบเก่าและสรุปเนื้อหาวิชาต่างๆ เพื่อการศึกษา</p>
          </div>
          <div className="flex-1 space-y-4">
            <div className="font-medium">ลิงก์ด่วน</div>
            <nav className="flex flex-col gap-2 text-sm">
              <Link href="/" className="hover:underline">
                หน้าหลัก
              </Link>
              <Link href="/subjects" className="hover:underline">
                วิชาทั้งหมด
              </Link>
              <Link href="/about" className="hover:underline">
                เกี่ยวกับเรา
              </Link>
              <Link href="/contact" className="hover:underline">
                ติดต่อเรา
              </Link>
            </nav>
          </div>
          <div className="flex-1 space-y-4">
            <div className="font-medium">ติดตามเรา</div>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t">
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
  {
    id: "chemistry",
    name: "เคมี",
    description: "อะตอม พันธะเคมี และปฏิกิริยาเคมี",
    tags: ["อะตอม", "พันธะเคมี", "ปฏิกิริยาเคมี"],
    exams: 16,
    summaries: 8,
    latestYear: "2566",
  },
  {
    id: "biology",
    name: "ชีววิทยา",
    description: "เซลล์ พันธุกรรม และระบบร่างกาย",
    tags: ["เซลล์", "พันธุกรรม", "ระบบร่างกาย"],
    exams: 15,
    summaries: 9,
    latestYear: "2566",
  },
  {
    id: "thai",
    name: "ภาษาไทย",
    description: "หลักภาษา วรรณคดี และการเขียน",
    tags: ["หลักภาษา", "วรรณคดี", "การเขียน"],
    exams: 20,
    summaries: 15,
    latestYear: "2566",
  },
  {
    id: "english",
    name: "ภาษาอังกฤษ",
    description: "ไวยากรณ์ การอ่าน และการเขียน",
    tags: ["ไวยากรณ์", "การอ่าน", "การเขียน"],
    exams: 22,
    summaries: 14,
    latestYear: "2566",
  },
  {
    id: "social",
    name: "สังคมศึกษา",
    description: "ประวัติศาสตร์ ภูมิศาสตร์ และหน้าที่พลเมือง",
    tags: ["ประวัติศาสตร์", "ภูมิศาสตร์", "หน้าที่พลเมือง"],
    exams: 19,
    summaries: 11,
    latestYear: "2566",
  },
  {
    id: "computer",
    name: "คอมพิวเตอร์",
    description: "การเขียนโปรแกรม และเทคโนโลยีสารสนเทศ",
    tags: ["การเขียนโปรแกรม", "เทคโนโลยีสารสนเทศ"],
    exams: 14,
    summaries: 7,
    latestYear: "2566",
  },
  {
    id: "art",
    name: "ศิลปะ",
    description: "ทัศนศิลป์ ดนตรี และนาฏศิลป์",
    tags: ["ทัศนศิลป์", "ดนตรี", "นาฏศิลป์"],
    exams: 10,
    summaries: 5,
    latestYear: "2565",
  },
]

// Missing imports
import { Facebook, Instagram, Menu, Twitter } from "lucide-react"

