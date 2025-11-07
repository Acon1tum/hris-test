'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MODULES } from '@hris/constants';
import { useAuthStore } from '@/stores/auth-store';
import { cn } from '@/lib/utils';
import * as Icons from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { user, hasModuleAccess } = useAuthStore();

  const accessibleModules = Object.values(MODULES).filter((module) =>
    hasModuleAccess(module.slug)
  );

  return (
    <aside className="w-64 bg-gray-900 text-white">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Quanby HRIS</h1>
      </div>
      <nav className="mt-6">
        <Link
          href="/dashboard"
          className={cn(
            'block px-4 py-3 hover:bg-gray-800',
            pathname === '/dashboard' && 'bg-gray-800'
          )}
        >
          Dashboard
        </Link>
        {accessibleModules.map((module) => {
          const Icon = (Icons as any)[module.icon] || Icons.Box;
          const isActive = pathname.startsWith(`/${module.slug}`);

          return (
            <Link
              key={module.id}
              href={`/${module.slug}`}
              className={cn(
                'flex items-center gap-3 px-4 py-3 hover:bg-gray-800',
                isActive && 'bg-gray-800'
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{module.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

