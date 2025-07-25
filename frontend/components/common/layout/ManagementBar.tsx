import {useState, useEffect} from 'react';
import {useTheme} from 'next-themes';
import {SidebarTrigger} from '@/components/ui/sidebar';
import {FloatingDock} from '@/components/ui/floating-dock';
import {SunIcon, MoonIcon, MenuIcon, HomeIcon, MessageCircleIcon, SendIcon} from 'lucide-react';

export function ManagementBar() {
  const {theme, setTheme} = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dockItems = [
    {
      title: '侧边栏',
      icon: <MenuIcon className="h-3 w-3" />,
      onClick: () => {
        const trigger = document.querySelector('[data-sidebar="trigger"]') as HTMLButtonElement;
        trigger?.click();
      },
    },
    {
      title: '主页',
      icon: <HomeIcon className="h-3 w-3" />,
      href: '/explore',
    },
    {
      title: mounted ? (theme === 'dark' ? '切换浅色模式' : '切换深色模式') : '主题切换',
      icon: mounted ? (theme === 'dark' ? <SunIcon className="h-3 w-3" /> : <MoonIcon className="h-3 w-3" />) : <SunIcon className="h-3 w-3" />,
      onClick: () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    },
    {
      title: '需求反馈',
      icon: <MessageCircleIcon className="h-3 w-3" />,
      href: 'https://github.com/linux-do/cdk/issues/new/choose',
    },
    {
      title: '群组交流',
      icon: <SendIcon className="h-3 w-3" />,
      href: 'https://t.me/linuxdocdk',
    },
  ];

  return (
    <div className="fixed bottom-4 ml-2 z-50 flex">
      <SidebarTrigger className="hidden" data-sidebar="trigger" />

      <div className="flex justify-center">
        <FloatingDock
          items={dockItems}
          desktopClassName="bg-background/70 backdrop-blur-md border border-border/40 shadow-lg shadow-black/10 dark:shadow-white/5"
          mobileButtonClassName="bg-background/70 backdrop-blur-md border border-border/40 shadow-lg shadow-black/10 dark:shadow-white/5"
        />
      </div>
    </div>
  );
}
