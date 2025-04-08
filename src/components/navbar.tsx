"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Menu, Upload, Search, User, LogIn } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

// สร้างฟังก์ชันจำลองสำหรับการตรวจสอบสถานะการเข้าสู่ระบบ
// ในอนาคตเมื่อมีการตั้งค่า NextAuth ที่สมบูรณ์ สามารถใช้ useSession() แทนได้
function useAuthStatus() {
  // สำหรับการทดสอบ UI สามารถเปลี่ยนค่าเป็น true เพื่อจำลองผู้ใช้ที่เข้าสู่ระบบแล้ว
  const isLoggedIn = false

  // ข้อมูลผู้ใช้จำลอง
  const mockUser = isLoggedIn
    ? {
        name: "ผู้ใช้ทดสอบ",
        email: "test@example.com",
        image: "/placeholder.svg?height=36&width=36",
      }
    : null

  return {
    data: {
      user: mockUser,
    },
    status: isLoggedIn ? "authenticated" : "unauthenticated",
  }
}

export function Navbar() {
  // ใช้ useAuthStatus แทน useSession
  const session = useAuthStatus()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // ในอนาคตจะเชื่อมต่อกับ API ค้นหา
    console.log("Searching for:", searchQuery)
  }

  const handleSignOut = async () => {
    // จำลองการออกจากระบบ
    console.log("Signing out...")
    // ในอนาคตเมื่อมีการตั้งค่า NextAuth ที่สมบูรณ์ สามารถใช้ signOut() แทนได้
    // await signOut({ redirect: true, callbackUrl: "/" })
  }

  const navLinks = [
    { href: "/", label: "หน้าหลัก" },
    { href: "/subjects", label: "วิชาทั้งหมด" },
    { href: "/upload", label: "อัพโหลดเอกสาร" },
    { href: "/about", label: "เกี่ยวกับเรา" },
  ]

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false
    return pathname?.startsWith(path)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"}`}
    >
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Book className="h-6 w-6 text-brand-600" />
          <span className="text-xl">ExamArchive</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-brand-600 ${
                isActive(link.href) ? "text-brand-600" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <form onSubmit={handleSearch} className="relative w-64">
            <Input
              type="search"
              placeholder="ค้นหาเอกสาร..."
              className="pl-9 pr-4 py-2 h-9 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </form>
        </nav>

        <div className="flex items-center gap-2">
          {session?.data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full" aria-label="User menu">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={session.data.user.image || "/placeholder.svg?height=36&width=36"}
                      alt={session.data.user.name || ""}
                    />
                    <AvatarFallback className="bg-brand-100 text-brand-700">
                      {session.data.user.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="cursor-pointer w-full">
                    โปรไฟล์
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/upload" className="cursor-pointer w-full">
                    อัพโหลดเอกสาร
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=my-uploads" className="cursor-pointer w-full">
                    เอกสารของฉัน
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile?tab=saved" className="cursor-pointer w-full">
                    เอกสารที่บันทึกไว้
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-500 focus:text-red-500">
                  ออกจากระบบ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild className="hidden md:flex">
                <Link href="/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  เข้าสู่ระบบ
                </Link>
              </Button>
              <Button size="sm" asChild className="hidden md:flex">
                <Link href="/signup">สมัครสมาชิก</Link>
              </Button>
            </>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">เปิดเมนู</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5 text-brand-600" />
                  <span>ExamArchive</span>
                </SheetTitle>
              </SheetHeader>

              <form onSubmit={handleSearch} className="relative mb-6">
                <Input
                  type="search"
                  placeholder="ค้นหาเอกสาร..."
                  className="pl-9 pr-4 py-2"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </form>

              <div className="flex flex-col gap-4">
                {session?.data?.user ? (
                  <div className="flex items-center gap-3 mb-2 p-2 rounded-md bg-muted">
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={session.data.user.image || "/placeholder.svg?height=36&width=36"}
                        alt={session.data.user.name || ""}
                      />
                      <AvatarFallback className="bg-brand-100 text-brand-700">
                        {session.data.user.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{session.data.user.name}</p>
                      <p className="text-xs text-muted-foreground">{session.data.user.email}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 mb-2">
                    <Button asChild className="flex-1">
                      <Link href="/signup">สมัครสมาชิก</Link>
                    </Button>
                    <Button variant="outline" asChild className="flex-1">
                      <Link href="/login">เข้าสู่ระบบ</Link>
                    </Button>
                  </div>
                )}

                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted ${
                          isActive(link.href) ? "bg-muted text-brand-600" : "text-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {session?.data?.user && (
                  <>
                    <div className="h-px bg-border my-2" />
                    <SheetClose asChild>
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <User className="h-4 w-4" />
                        โปรไฟล์
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/upload"
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted"
                      >
                        <Upload className="h-4 w-4" />
                        อัพโหลดเอกสาร
                      </Link>
                    </SheetClose>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start gap-2 px-3 py-2 h-auto font-medium text-sm text-red-500 hover:bg-red-50 hover:text-red-500"
                      onClick={handleSignOut}
                    >
                      <LogIn className="h-4 w-4 rotate-180" />
                      ออกจากระบบ
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

