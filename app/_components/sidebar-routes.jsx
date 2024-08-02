'use client'

import { BarChart, Compass, Layout, List } from 'lucide-react'
// import { usePathname } from 'next/navigation'
import { SidebarItem } from './sidebar-item'

const guestRoutes = [
  {
    icon: Compass,
    label: 'Browse',
    href: '/',
  },
  {
    icon: Layout,
    label: 'Explore Services',
    href: '/search/datascience',
  },
  {
    icon: List,
    label: 'My Bookings',
    href: '/mybookings/',
  }

]

// const teacherRoutes = [
//   {
//     icon: List,
//     label: 'Courses',
//     href: '/teacher/courses',
//   },
//   {
//     icon: BarChart,
//     label: 'Analytics',
//     href: '/teacher/analytics',
//   },
// ]

export const SidebarRoutes = () => {
     
    const routes = guestRoutes
    return (
      <div className="flex w-full flex-col">
        {routes.map((route) => (
          <SidebarItem key={route.href} icon={route.icon} label={route.label} href={route.href} />
        ))}
      </div>
    )
}