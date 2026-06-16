import { sleep } from './index'

export interface ReportData {
  month: string
  pending: number
  approved: number
  rejected: number
}

export interface Report {
  title: string
  data: ReportData[]
  summary: {
    totalRequests: number
    approvalRate: number
    averageProcessingDays: number
  }
}

export async function getReports(): Promise<Report> {
  await sleep(400)

  return {
    title: 'Transfer Request Analytics',
    data: [
      { month: 'Jan', pending: 12, approved: 15, rejected: 2 },
      { month: 'Feb', pending: 8, approved: 18, rejected: 3 },
      { month: 'Mar', pending: 15, approved: 22, rejected: 2 },
      { month: 'Apr', pending: 10, approved: 19, rejected: 4 },
      { month: 'May', pending: 14, approved: 21, rejected: 3 },
      { month: 'Jun', pending: 3, approved: 2, rejected: 1 },
    ],
    summary: {
      totalRequests: 120,
      approvalRate: 0.82,
      averageProcessingDays: 7,
    },
  }
}
