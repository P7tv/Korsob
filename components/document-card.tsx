import Link from "next/link"
import { File, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface DocumentCardProps {
  id: number | string
  type: "exam" | "summary"
  title: string
  subject: string
  subjectName: string
  year: string
  semester?: string
  uploadedAt: string
  uploadedBy?: string
  description?: string
}

export function DocumentCard({
  id,
  type,
  title,
  subject,
  subjectName,
  year,
  semester,
  uploadedAt,
  uploadedBy,
  description,
}: DocumentCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-2">
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 shrink-0">
            {type === "exam" ? (
              <FileText className="h-4 w-4 text-primary" />
            ) : (
              <File className="h-4 w-4 text-primary" />
            )}
          </div>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs">
              {subjectName} • ปีการศึกษา {year}
              {type === "exam" && semester && ` • ภาคเรียนที่ ${semester}`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        {description && <p className="text-sm text-muted-foreground mb-3">{description}</p>}
        <div className="text-xs text-muted-foreground">
          <p>อัพโหลดเมื่อ: {uploadedAt}</p>
          {uploadedBy && <p>โดย: {uploadedBy}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/documents/${id}`}>ดูรายละเอียด</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

