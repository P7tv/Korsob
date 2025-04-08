import Link from "next/link"
import { FileText, Search, Upload, ArrowRight, Star, Download, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-700 to-brand-500 -z-10" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10 -z-10" />

          <div className="container px-4 py-16 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm">
                แหล่งเรียนรู้ออนไลน์สำหรับนักเรียนและนักศึกษา
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                แหล่งรวมข้อสอบเก่าและสรุปเนื้อหาวิชา
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                ค้นหาข้อสอบเก่าและสรุปเนื้อหาวิชาต่างๆ ตามปีการศึกษาที่ต้องการ เพื่อเตรียมความพร้อมในการสอบและทบทวนบทเรียน
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <div className="relative w-full sm:w-auto sm:flex-1 max-w-md mx-auto">
                  <Input
                    type="search"
                    placeholder="ค้นหาวิชาหรือเอกสาร..."
                    className="pl-10 pr-4 py-6 bg-white/95 backdrop-blur-sm border-0 shadow-lg"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90 shadow-lg">
                  <Search className="h-5 w-5 mr-2" />
                  ค้นหา
                </Button>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/subjects/math"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors"
                >
                  คณิตศาสตร์
                </Link>
                <Link
                  href="/subjects/physics"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors"
                >
                  ฟิสิกส์
                </Link>
                <Link
                  href="/subjects/chemistry"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors"
                >
                  เคมี
                </Link>
                <Link
                  href="/subjects/biology"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors"
                >
                  ชีววิทยา
                </Link>
                <Link
                  href="/subjects/english"
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm transition-colors"
                >
                  ภาษาอังกฤษ
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">ทำไมต้อง ExamArchive?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                เราเป็นแพลตฟอร์มที่รวบรวมข้อสอบและสรุปเนื้อหาวิชาต่างๆ ที่มีคุณภาพ เพื่อช่วยให้การเรียนรู้ของคุณง่ายขึ้น
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl border shadow-sm card-hover">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ข้อสอบและสรุปเนื้อหาคุณภาพ</h3>
                <p className="text-muted-foreground">
                  เอกสารทั้งหมดได้รับการคัดกรองและตรวจสอบคุณภาพ เพื่อให้คุณได้รับข้อมูลที่ถูกต้องและเป็นประโยชน์
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm card-hover">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ชุมชนแห่งการแบ่งปัน</h3>
                <p className="text-muted-foreground">เป็นส่วนหนึ่งของชุมชนที่แบ่งปันความรู้ ช่วยเหลือซึ่งกันและกัน และเติบโตไปด้วยกัน</p>
              </div>

              <div className="bg-white p-6 rounded-xl border shadow-sm card-hover">
                <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center mb-4">
                  <Download className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">ดาวน์โหลดได้ทุกที่ทุกเวลา</h3>
                <p className="text-muted-foreground">เข้าถึงเอกสารได้ทุกที่ทุกเวลา ดาวน์โหลดเก็บไว้อ่านออฟไลน์ หรืออ่านออนไลน์ก็ได้</p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Subjects Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">วิชายอดนิยม</h2>
                <p className="text-muted-foreground">วิชาที่มีการค้นหาและเข้าชมมากที่สุด</p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/subjects" className="flex items-center">
                  ดูวิชาทั้งหมด
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularSubjects.map((subject) => (
                <Link key={subject.id} href={`/subjects/${subject.id}`} className="group">
                  <div className="bg-white rounded-xl border shadow-sm p-6 h-full card-hover">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold group-hover:text-brand-600 transition-colors">
                          {subject.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="h-4 w-4 fill-amber-400" />
                          <span className="text-sm text-muted-foreground">
                            {subject.rating} ({subject.reviewCount} รีวิว)
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{subject.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {subject.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>เอกสาร: {subject.documentCount}</span>
                      <span>ปีล่าสุด: {subject.latestYear}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-400 -z-10" />
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-10 -z-10" />

          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">มีข้อสอบหรือสรุปเนื้อหาที่ต้องการแบ่งปัน?</h2>
              <p className="text-lg text-white/90 mb-8">ร่วมเป็นส่วนหนึ่งในการแบ่งปันความรู้ให้กับผู้อื่น อัพโหลดเอกสารของคุณได้เลยวันนี้</p>
              <Button size="lg" className="bg-white text-brand-700 hover:bg-white/90" asChild>
                <Link href="/upload">
                  <Upload className="h-5 w-5 mr-2" />
                  อัพโหลดเอกสารของคุณ
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Academic Years Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">ค้นหาตามปีการศึกษา</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">เลือกปีการศึกษาที่ต้องการค้นหาข้อสอบและสรุปเนื้อหา</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
              {academicYears.map((year) => (
                <Link
                  key={year}
                  href={`/years/${year}`}
                  className="bg-white border rounded-lg p-4 text-center hover:border-brand-500 hover:shadow-md transition-all"
                >
                  <span className="text-lg font-medium">{year}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

const popularSubjects = [
  {
    id: "math",
    name: "คณิตศาสตร์",
    description: "พีชคณิต เรขาคณิต แคลคูลัส และสถิติ",
    tags: ["พีชคณิต", "เรขาคณิต", "แคลคูลัส", "สถิติ"],
    documentCount: 124,
    rating: 4.8,
    reviewCount: 56,
    latestYear: "2566",
  },
  {
    id: "physics",
    name: "ฟิสิกส์",
    description: "กลศาสตร์ ไฟฟ้า แม่เหล็ก และคลื่น",
    tags: ["กลศาสตร์", "ไฟฟ้า", "แม่เหล็ก", "คลื่น"],
    documentCount: 98,
    rating: 4.7,
    reviewCount: 42,
    latestYear: "2566",
  },
  {
    id: "chemistry",
    name: "เคมี",
    description: "อะตอม พันธะเคมี และปฏิกิริยาเคมี",
    tags: ["อะตอม", "พันธะเคมี", "ปฏิกิริยาเคมี"],
    documentCount: 87,
    rating: 4.6,
    reviewCount: 38,
    latestYear: "2566",
  },
  {
    id: "biology",
    name: "ชีววิทยา",
    description: "เซลล์ พันธุกรรม และระบบร่างกาย",
    tags: ["เซลล์", "พันธุกรรม", "ระบบร่างกาย"],
    documentCount: 76,
    rating: 4.5,
    reviewCount: 31,
    latestYear: "2566",
  },
  {
    id: "thai",
    name: "ภาษาไทย",
    description: "หลักภาษา วรรณคดี และการเขียน",
    tags: ["หลักภาษา", "วรรณคดี", "การเขียน"],
    documentCount: 112,
    rating: 4.7,
    reviewCount: 48,
    latestYear: "2566",
  },
  {
    id: "english",
    name: "ภาษาอังกฤษ",
    description: "ไวยากรณ์ การอ่าน และการเขียน",
    tags: ["ไวยากรณ์", "การอ่าน", "การเขียน"],
    documentCount: 103,
    rating: 4.6,
    reviewCount: 45,
    latestYear: "2566",
  },
]

const academicYears = ["2566", "2565", "2564", "2563", "2562", "2561", "2560", "2559", "2558"]

