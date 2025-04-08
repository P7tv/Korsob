import Link from "next/link"
import { Book, Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t">
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Book className="h-6 w-6 text-brand-600" />
              <span className="text-xl">ExamArchive</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              แหล่งรวมข้อสอบเก่าและสรุปเนื้อหาวิชาต่างๆ เพื่อการศึกษา ช่วยให้นักเรียนและนักศึกษาเข้าถึงข้อมูลได้ง่ายขึ้น
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-brand-600 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-brand-600 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-brand-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">ลิงก์ด่วน</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-muted-foreground hover:text-brand-600 transition-colors">
                หน้าหลัก
              </Link>
              <Link href="/subjects" className="text-muted-foreground hover:text-brand-600 transition-colors">
                วิชาทั้งหมด
              </Link>
              <Link href="/upload" className="text-muted-foreground hover:text-brand-600 transition-colors">
                อัพโหลดเอกสาร
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-brand-600 transition-colors">
                เกี่ยวกับเรา
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-brand-600 transition-colors">
                ติดต่อเรา
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">วิชายอดนิยม</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/subjects/math" className="text-muted-foreground hover:text-brand-600 transition-colors">
                คณิตศาสตร์
              </Link>
              <Link href="/subjects/physics" className="text-muted-foreground hover:text-brand-600 transition-colors">
                ฟิสิกส์
              </Link>
              <Link href="/subjects/chemistry" className="text-muted-foreground hover:text-brand-600 transition-colors">
                เคมี
              </Link>
              <Link href="/subjects/biology" className="text-muted-foreground hover:text-brand-600 transition-colors">
                ชีววิทยา
              </Link>
              <Link href="/subjects/english" className="text-muted-foreground hover:text-brand-600 transition-colors">
                ภาษาอังกฤษ
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">ติดต่อเรา</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-brand-600 mt-0.5" />
                <span className="text-muted-foreground">contact@examarchive.com</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-brand-600 mt-0.5" />
                <span className="text-muted-foreground">02-123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">&copy; {currentYear} ExamArchive. สงวนลิขสิทธิ์.</p>
          <nav className="flex gap-6 text-sm">
            <Link href="/terms" className="text-muted-foreground hover:text-brand-600 transition-colors">
              ข้อกำหนดการใช้งาน
            </Link>
            <Link href="/privacy" className="text-muted-foreground hover:text-brand-600 transition-colors">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="/faq" className="text-muted-foreground hover:text-brand-600 transition-colors">
              คำถามที่พบบ่อย
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

