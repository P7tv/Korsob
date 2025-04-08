"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Eye, FileText, Flag, Loader2, Star, ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { File } from "lucide-react"

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(42)
  const [isDownloading, setIsDownloading] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [reportReason, setReportReason] = useState("")
  const [reportDetails, setReportDetails] = useState("")
  const [isSubmittingReport, setIsSubmittingReport] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)

  // In a real application, you would fetch the document data based on the ID
  const document = {
    id: params.id,
    type: "exam",
    title: "ข้อสอบกลางภาค วิชาคณิตศาสตร์",
    subject: "math",
    subjectName: "คณิตศาสตร์",
    year: "2566",
    semester: "1",
    uploadedAt: "12 มี.ค. 2566 (14:30 น.)",
    uploadedBy: "ธนพล สมศักดิ์",
    uploaderId: "user123",
    description: "ข้อสอบกลางภาคเรียนที่ 1 วิชาคณิตศาสตร์ ปีการศึกษา 2566 ครอบคลุมเนื้อหาบทที่ 1-5",
    downloadCount: 128,
    viewCount: 356,
    rating: 4.7,
    ratingCount: 32,
    files: [
      {
        id: 1,
        name: "ข้อสอบกลางภาค_คณิตศาสตร์_2566.pdf",
        size: "2.4 MB",
        type: "pdf",
      },
      {
        id: 2,
        name: "เฉลยข้อสอบกลางภาค_คณิตศาสตร์_2566.pdf",
        size: "3.1 MB",
        type: "pdf",
      },
    ],
  }

  const handleDownload = (fileId: number) => {
    setIsDownloading(true)

    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false)
      toast({
        title: "กำลังดาวน์โหลด",
        description: "ไฟล์ของคุณกำลังถูกดาวน์โหลด",
      })
    }, 1000)
  }

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleRatingChange = (rating: number) => {
    setUserRating(rating)
  }

  const handleSubmitReview = () => {
    if (userRating === 0) {
      toast({
        title: "กรุณาให้คะแนน",
        description: "กรุณาให้คะแนนดาวก่อนส่งรีวิว",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingReview(true)

    // Simulate review submission
    setTimeout(() => {
      setIsSubmittingReview(false)
      toast({
        title: "ส่งรีวิวสำเร็จ",
        description: "ขอบคุณสำหรับความคิดเห็นของคุณ",
      })
      setReviewText("")
    }, 1000)
  }

  const handleSubmitReport = () => {
    if (!reportReason) {
      toast({
        title: "กรุณาเลือกเหตุผล",
        description: "กรุณาเลือกเหตุผลในการรายงาน",
        variant: "destructive",
      })
      return
    }

    setIsSubmittingReport(true)

    // Simulate report submission
    setTimeout(() => {
      setIsSubmittingReport(false)
      setShowReportDialog(false)
      toast({
        title: "ส่งรายงานสำเร็จ",
        description: "ขอบคุณสำหรับการรายงาน เราจะตรวจสอบเนื้อหาโดยเร็วที่สุด",
      })
      setReportReason("")
      setReportDetails("")
    }, 1000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gray-50">
        <div className="container px-4 py-8 md:py-12">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <Button variant="outline" size="icon" asChild className="h-8 w-8">
              <Link href="/subjects">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">กลับ</span>
              </Link>
            </Button>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/subjects/${document.subject}`}
                className="text-muted-foreground hover:text-brand-600 text-sm"
              >
                {document.subjectName}
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href={`/years/${document.year}`} className="text-muted-foreground hover:text-brand-600 text-sm">
                {document.year}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm font-medium">{document.title}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="overflow-hidden">
                <div className="bg-gradient-to-r from-brand-700 to-brand-500 text-white p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                      {document.type === "exam" ? "ข้อสอบ" : "สรุปเนื้อหา"}
                    </Badge>
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                      {document.semester ? `ภาคเรียนที่ ${document.semester}` : ""}
                    </Badge>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">{document.title}</h1>
                  <div className="flex items-center gap-1 text-white/80 text-sm">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(document.rating) ? "text-yellow-400 fill-yellow-400" : "text-white/40"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1">
                      {document.rating} ({document.ratingCount} รีวิว)
                    </span>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={document.uploadedBy} />
                        <AvatarFallback className="bg-brand-100 text-brand-700">
                          {document.uploadedBy.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link
                          href={`/profile/${document.uploaderId}`}
                          className="font-medium hover:text-brand-600 transition-colors"
                        >
                          {document.uploadedBy}
                        </Link>
                        <p className="text-xs text-muted-foreground">อัพโหลดเมื่อ {document.uploadedAt}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">คำอธิบาย</h3>
                      <p className="text-sm">{document.description}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">ไฟล์</h3>
                      <div className="space-y-3">
                        {document.files.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-lg flex items-center justify-center">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">{file.size}</p>
                              </div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownload(file.id)}
                              disabled={isDownloading}
                              className="text-brand-600 border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                            >
                              {isDownloading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Download className="h-4 w-4 mr-2" />
                                  ดาวน์โหลด
                                </>
                              )}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex justify-between p-6 bg-gray-50 border-t">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{document.viewCount} ครั้ง</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Download className="h-4 w-4" />
                      <span>{document.downloadCount} ครั้ง</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={liked ? "default" : "outline"}
                      size="sm"
                      onClick={handleLike}
                      className={liked ? "bg-brand-600 hover:bg-brand-700" : ""}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {likeCount} ถูกใจ
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowReportDialog(true)}>
                      <Flag className="h-4 w-4 mr-2" />
                      รายงาน
                    </Button>
                  </div>
                </CardFooter>
              </Card>

              <Tabs defaultValue="reviews" className="bg-white rounded-lg border shadow-sm">
                <TabsList className="w-full p-0 bg-transparent border-b rounded-none h-auto">
                  <TabsTrigger
                    value="reviews"
                    className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-600 data-[state=active]:shadow-none"
                  >
                    รีวิว ({document.ratingCount})
                  </TabsTrigger>
                  <TabsTrigger
                    value="add-review"
                    className="flex-1 py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-brand-600 data-[state=active]:shadow-none"
                  >
                    เขียนรีวิว
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="reviews" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar className="h-9 w-9">
                              <AvatarImage src="/placeholder.svg?height=36&width=36" alt={review.userName} />
                              <AvatarFallback className="bg-brand-100 text-brand-700">
                                {review.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{review.userName}</p>
                              <div className="flex items-center">
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className={`h-3 w-3 ${
                                        star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-muted-foreground ml-2">{review.date}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">ยังไม่มีรีวิวสำหรับเอกสารนี้</p>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="add-review" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rating" className="block mb-2">
                        ให้คะแนน
                      </Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Button
                            key={star}
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => handleRatingChange(star)}
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= userRating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                              }`}
                            />
                            <span className="sr-only">{star} ดาว</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="review">ความคิดเห็น</Label>
                      <Textarea
                        id="review"
                        placeholder="เขียนความคิดเห็นของคุณที่นี่..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                    <Button onClick={handleSubmitReview} disabled={isSubmittingReview} className="w-full md:w-auto">
                      {isSubmittingReview ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          กำลังส่ง...
                        </>
                      ) : (
                        "ส่งรีวิว"
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">เอกสารที่เกี่ยวข้อง</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedDocuments.map((doc) => (
                      <Link key={doc.id} href={`/documents/${doc.id}`}>
                        <div className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          {doc.type === "exam" ? (
                            <FileText className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                          ) : (
                            <File className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium text-sm hover:text-brand-600 transition-colors">{doc.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {doc.subjectName} • ปีการศึกษา {doc.year}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/subjects/${document.subject}`}>ดูเอกสารทั้งหมดในวิชานี้</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">อัพโหลดโดย</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="/placeholder.svg?height=48&width=48" alt={document.uploadedBy} />
                      <AvatarFallback className="bg-brand-100 text-brand-700">
                        {document.uploadedBy.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Link
                        href={`/profile/${document.uploaderId}`}
                        className="font-medium hover:text-brand-600 transition-colors"
                      >
                        {document.uploadedBy}
                      </Link>
                      <p className="text-xs text-muted-foreground">อัพโหลด 24 เอกสาร</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href={`/profile/${document.uploaderId}`}>ดูโปรไฟล์</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">แท็ก</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/tags/math`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      คณิตศาสตร์
                    </Link>
                    <Link
                      href={`/tags/exam`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      ข้อสอบ
                    </Link>
                    <Link
                      href={`/tags/midterm`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      กลางภาค
                    </Link>
                    <Link
                      href={`/tags/2566`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      2566
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Report Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>รายงานเอกสาร</DialogTitle>
            <DialogDescription>กรุณาระบุเหตุผลในการรายงานเอกสารนี้</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="report-reason">เหตุผลในการรายงาน</Label>
              <Select value={reportReason} onValueChange={setReportReason}>
                <SelectTrigger id="report-reason">
                  <SelectValue placeholder="เลือกเหตุผล" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="copyright">ละเมิดลิขสิทธิ์</SelectItem>
                  <SelectItem value="inappropriate">เนื้อหาไม่เหมาะสม</SelectItem>
                  <SelectItem value="wrong-info">ข้อมูลไม่ถูกต้อง</SelectItem>
                  <SelectItem value="spam">สแปม</SelectItem>
                  <SelectItem value="other">อื่นๆ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="report-details">รายละเอียดเพิ่มเติม</Label>
              <Textarea
                id="report-details"
                placeholder="กรุณาระบุรายละเอียดเพิ่มเติม..."
                value={reportDetails}
                onChange={(e) => setReportDetails(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button variant="outline" onClick={() => setShowReportDialog(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSubmitReport} disabled={isSubmittingReport} className="mb-2 sm:mb-0">
              {isSubmittingReport ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  กำลังส่ง...
                </>
              ) : (
                "ส่งรายงาน"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  )
}

// Mock data for related documents
const relatedDocuments = [
  {
    id: "2",
    type: "exam",
    title: "ข้อสอบปลายภาค วิชาคณิตศาสตร์",
    subject: "math",
    subjectName: "คณิตศาสตร์",
    year: "2566",
    semester: "1",
  },
  {
    id: "3",
    type: "summary",
    title: "สรุปเนื้อหาบทที่ 1-5 วิชาคณิตศาสตร์",
    subject: "math",
    subjectName: "คณิตศาสตร์",
    year: "2566",
  },
  {
    id: "4",
    type: "exam",
    title: "ข้อสอบกลางภาค วิชาคณิตศาสตร์",
    subject: "math",
    subjectName: "คณิตศาสตร์",
    year: "2565",
    semester: "1",
  },
]

// Mock data for reviews
const reviews = [
  {
    id: 1,
    userName: "วิชัย รักเรียน",
    rating: 5,
    date: "20 มี.ค. 2566",
    comment: "เอกสารมีประโยชน์มาก ข้อสอบครอบคลุมเนื้อหาทั้งหมดที่เรียน ขอบคุณสำหรับการแบ่งปัน!",
  },
  {
    id: 2,
    userName: "สมหญิง ใจดี",
    rating: 4,
    date: "18 มี.ค. 2566",
    comment: "เอกสารดีมาก แต่อยากให้มีคำอธิบายเพิ่มเติมในบางข้อ",
  },
  {
    id: 3,
    userName: "ประเสริฐ นักเรียน",
    rating: 5,
    date: "15 มี.ค. 2566",
    comment: "ช่วยในการเตรียมตัวสอบได้มาก ขอบคุณมากๆ ครับ",
  },
]

