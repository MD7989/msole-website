import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarClock,
  CheckCircle2,
  ExternalLink,
  Inbox,
  Loader2,
  Lock,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Save,
  Settings,
  Shield,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { contactService, settingsService } from '@/services';

const emptyLoginForm = {
  email: '',
  password: ''
};

const emptyRegisterForm = {
  name: '',
  email: '',
  password: ''
};

const defaultSettingsForm = {
  siteName: '',
  authRequired: false,
  contactEmail: '',
  calendlyUrl: '',
  socialLinks: {
    linkedin: '',
    upwork: '',
    whatsapp: ''
  },
  maintenanceMode: false
};

const formatDateTime = (value) => {
  if (!value) return 'Unknown';

  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
};

const statusStyles = {
  new: 'border-amber-400/25 bg-amber-400/10 text-amber-200',
  read: 'border-sky-400/25 bg-sky-400/10 text-sky-200',
  replied: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-200',
  archived: 'border-white/10 bg-white/5 text-white/45'
};

const createReplyLinks = (message) => {
  const subject = encodeURIComponent(`Re: New MSole contact request from ${message.name}`);
  const body = encodeURIComponent(`Hi ${message.name},\n\n`);
  const to = encodeURIComponent(message.email);

  return {
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
    mailto: `mailto:${message.email}?subject=${subject}&body=${body}`
  };
};

const AdminShell = ({ user, onLogout, children }) => (
  <div className="min-h-screen bg-[#06101f] text-white">
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#06101f]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-secondary/30 bg-secondary/10 text-secondary">
            <Shield className="h-4 w-4" />
          </div>
          <div>
            <Link to="/" className="text-sm font-bold tracking-widest text-white">
              M<span className="text-secondary">.</span>SOLE
            </Link>
            <p className="text-xs text-white/45">Admin Console</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
            <p className="text-xs text-white/45">{user?.email}</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>

    <main className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
      {children}
    </main>
  </div>
);

const AdminAuth = () => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState('login');
  const [loginForm, setLoginForm] = useState(emptyLoginForm);
  const [registerForm, setRegisterForm] = useState(emptyRegisterForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(loginForm);
    } catch (err) {
      setError(err.message || 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await register(registerForm);
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06101f] text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-5 py-10">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
          <section>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest text-white">
              M<span className="text-secondary">.</span>SOLE
            </Link>
            <div className="mt-12 max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-secondary/25 bg-secondary/10 px-3 py-2 text-xs font-medium text-secondary">
                <Shield className="h-4 w-4" />
                Admin access
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                Manage messages and site settings from one secure workspace.
              </h1>
              <p className="mt-5 text-base leading-7 text-white/60">
                Sign in with an admin account to review contact submissions, verify notification delivery, and update public business details.
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30">
            <div className="grid grid-cols-2 rounded-md border border-white/10 bg-black/20 p-1">
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError('');
                }}
                className={cn(
                  'flex h-10 items-center justify-center gap-2 rounded text-sm font-medium transition-colors',
                  mode === 'login' ? 'bg-secondary text-secondary-foreground' : 'text-white/55 hover:text-white'
                )}
              >
                <Lock className="h-4 w-4" />
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('register');
                  setError('');
                }}
                className={cn(
                  'flex h-10 items-center justify-center gap-2 rounded text-sm font-medium transition-colors',
                  mode === 'register' ? 'bg-secondary text-secondary-foreground' : 'text-white/55 hover:text-white'
                )}
              >
                <UserPlus className="h-4 w-4" />
                Create
              </button>
            </div>

            {error && (
              <div className="mt-4 flex gap-3 rounded-md border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-100">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {mode === 'login' ? (
              <form className="mt-5 space-y-4" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="admin-email" className="text-white/70">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    autoComplete="email"
                    value={loginForm.email}
                    onChange={(event) => setLoginForm((current) => ({ ...current, email: event.target.value }))}
                    className="border-white/10 bg-black/20 text-white placeholder:text-white/25"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password" className="text-white/70">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    value={loginForm.password}
                    onChange={(event) => setLoginForm((current) => ({ ...current, password: event.target.value }))}
                    className="border-white/10 bg-black/20 text-white placeholder:text-white/25"
                    placeholder="Password"
                    required
                  />
                </div>
                <Button type="submit" className="h-11 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                  Sign in
                </Button>
              </form>
            ) : (
              <form className="mt-5 space-y-4" onSubmit={handleRegister}>
                <div className="space-y-2">
                  <Label htmlFor="admin-name" className="text-white/70">Name</Label>
                  <Input
                    id="admin-name"
                    autoComplete="name"
                    value={registerForm.name}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, name: event.target.value }))}
                    className="border-white/10 bg-black/20 text-white placeholder:text-white/25"
                    placeholder="Admin User"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-admin-email" className="text-white/70">Email</Label>
                  <Input
                    id="new-admin-email"
                    type="email"
                    autoComplete="email"
                    value={registerForm.email}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, email: event.target.value }))}
                    className="border-white/10 bg-black/20 text-white placeholder:text-white/25"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-admin-password" className="text-white/70">Password</Label>
                  <Input
                    id="new-admin-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={registerForm.password}
                    onChange={(event) => setRegisterForm((current) => ({ ...current, password: event.target.value }))}
                    className="border-white/10 bg-black/20 text-white placeholder:text-white/25"
                    placeholder="Minimum 8 characters"
                    required
                  />
                </div>
                <Button type="submit" className="h-11 w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
                  Create account
                </Button>
              </form>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

const AccessDenied = ({ user, onLogout }) => (
  <AdminShell user={user} onLogout={onLogout}>
    <div className="mx-auto mt-16 max-w-lg rounded-lg border border-red-400/20 bg-red-400/10 p-6 text-center">
      <AlertCircle className="mx-auto h-10 w-10 text-red-200" />
      <h1 className="mt-4 text-2xl font-bold text-white">Admin access required</h1>
      <p className="mt-3 text-sm leading-6 text-white/60">
        You are signed in, but this account is not assigned the admin role.
      </p>
      <Button type="button" onClick={onLogout} className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
        <LogOut className="h-4 w-4" />
        Sign out
      </Button>
    </div>
  </AdminShell>
);

export default function Admin() {
  const { user, isAuthenticated, isLoadingAuth, logout, appPublicSettings, checkAppState } = useAuth();
  const [activeTab, setActiveTab] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [settingsForm, setSettingsForm] = useState(defaultSettingsForm);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [notice, setNotice] = useState(null);

  const isAdmin = user?.role === 'admin';

  const selectedMessage = useMemo(() => {
    return messages.find((message) => message.id === selectedMessageId) || messages[0] || null;
  }, [messages, selectedMessageId]);

  useEffect(() => {
    if (appPublicSettings) {
      setSettingsForm({
        ...defaultSettingsForm,
        ...appPublicSettings,
        socialLinks: {
          ...defaultSettingsForm.socialLinks,
          ...(appPublicSettings.socialLinks || {})
        }
      });
    }
  }, [appPublicSettings]);

  useEffect(() => {
    if (isAdmin) {
      loadMessages();
    }
  }, [isAdmin]);

  const loadMessages = async () => {
    setIsLoadingMessages(true);
    setNotice(null);

    try {
      const data = await contactService.listMessages();
      setMessages(data.messages || []);
      setSelectedMessageId((current) => current || data.messages?.[0]?.id || null);
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to load messages.' });
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleSettingsChange = (key, value) => {
    setSettingsForm((current) => ({
      ...current,
      [key]: value
    }));
  };

  const handleSocialChange = (key, value) => {
    setSettingsForm((current) => ({
      ...current,
      socialLinks: {
        ...current.socialLinks,
        [key]: value
      }
    }));
  };

  const saveSettings = async (event) => {
    event.preventDefault();
    setIsSavingSettings(true);
    setNotice(null);

    try {
      const payload = {
        siteName: settingsForm.siteName,
        authRequired: settingsForm.authRequired,
        contactEmail: settingsForm.contactEmail,
        calendlyUrl: settingsForm.calendlyUrl,
        socialLinks: settingsForm.socialLinks,
        maintenanceMode: settingsForm.maintenanceMode
      };

      const data = await settingsService.updateSettings(payload);
      setSettingsForm({
        ...defaultSettingsForm,
        ...data.settings,
        socialLinks: {
          ...defaultSettingsForm.socialLinks,
          ...(data.settings?.socialLinks || {})
        }
      });
      await checkAppState();
      setNotice({ type: 'success', message: 'Settings saved successfully.' });
    } catch (err) {
      setNotice({ type: 'error', message: err.message || 'Failed to save settings.' });
    } finally {
      setIsSavingSettings(false);
    }
  };

  const replyToMessage = (message) => {
    const links = createReplyLinks(message);
    const openedWindow = window.open(links.gmail, '_blank', 'noopener,noreferrer');

    if (!openedWindow) {
      window.location.href = links.mailto;
    }
  };

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#06101f]">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminAuth />;
  }

  if (!isAdmin) {
    return <AccessDenied user={user} onLogout={handleLogout} />;
  }

  const stats = [
    { label: 'Total messages', value: messages.length, icon: Inbox },
    { label: 'New', value: messages.filter((message) => message.status === 'new').length, icon: MessageSquare },
    { label: 'Email sent', value: messages.filter((message) => message.emailDelivery?.sent).length, icon: Mail }
  ];

  return (
    <AdminShell user={user} onLogout={handleLogout}>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-secondary">Admin Console</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-white">Operations Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setActiveTab('messages')}
            className={cn(
              'border-white/10 text-white hover:bg-white/10 hover:text-white',
              activeTab === 'messages' ? 'bg-white/10' : 'bg-white/5'
            )}
          >
            <Inbox className="h-4 w-4" />
            Messages
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setActiveTab('settings')}
            className={cn(
              'border-white/10 text-white hover:bg-white/10 hover:text-white',
              activeTab === 'settings' ? 'bg-white/10' : 'bg-white/5'
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {notice && (
        <div
          className={cn(
            'mb-5 flex items-center gap-3 rounded-md border p-3 text-sm',
            notice.type === 'success'
              ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-100'
              : 'border-red-400/20 bg-red-400/10 text-red-100'
          )}
        >
          {notice.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          {notice.message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <div key={item.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/50">{item.label}</p>
              <item.icon className="h-4 w-4 text-secondary" />
            </div>
            <p className="mt-3 text-3xl font-bold text-white">{item.value}</p>
          </div>
        ))}
      </div>

      {activeTab === 'messages' ? (
        <section className="mt-6 grid gap-5 lg:grid-cols-[430px_1fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04]">
            <div className="flex items-center justify-between border-b border-white/10 p-4">
              <div>
                <h2 className="font-semibold text-white">Contact Messages</h2>
                <p className="mt-1 text-xs text-white/45">Latest 100 submissions</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={loadMessages}
                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                disabled={isLoadingMessages}
              >
                <RefreshCw className={cn('h-4 w-4', isLoadingMessages && 'animate-spin')} />
              </Button>
            </div>
            <div className="max-h-[620px] overflow-y-auto">
              {isLoadingMessages && messages.length === 0 ? (
                <div className="flex h-48 items-center justify-center text-white/45">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading messages
                </div>
              ) : messages.length === 0 ? (
                <div className="p-6 text-center text-sm text-white/45">No messages yet.</div>
              ) : (
                messages.map((message) => (
                  <button
                    type="button"
                    key={message.id}
                    onClick={() => setSelectedMessageId(message.id)}
                    className={cn(
                      'block w-full border-b border-white/10 p-4 text-left transition-colors last:border-b-0 hover:bg-white/[0.06]',
                      selectedMessage?.id === message.id && 'bg-white/[0.08]'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-white">{message.name}</p>
                        <p className="mt-1 truncate text-xs text-white/45">{message.email}</p>
                      </div>
                      <span className={cn('shrink-0 rounded-full border px-2 py-0.5 text-[11px]', statusStyles[message.status] || statusStyles.new)}>
                        {message.status}
                      </span>
                    </div>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/60">{message.message}</p>
                    <p className="mt-3 text-xs text-white/35">{formatDateTime(message.createdAt)}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
            {selectedMessage ? (
              <div>
                <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-5 md:flex-row md:items-start">
                  <div>
                    <h2 className="text-xl font-bold text-white">{selectedMessage.name}</h2>
                    <a href={`mailto:${selectedMessage.email}`} className="mt-2 inline-flex items-center gap-2 text-sm text-secondary hover:text-secondary/80">
                      <Mail className="h-4 w-4" />
                      {selectedMessage.email}
                    </a>
                  </div>
                  <span className={cn('w-fit rounded-full border px-3 py-1 text-xs', statusStyles[selectedMessage.status] || statusStyles.new)}>
                    {selectedMessage.status}
                  </span>
                </div>

                <dl className="mt-5 grid gap-4 md:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-white/35">Company</dt>
                    <dd className="mt-1 text-sm text-white">{selectedMessage.company || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-white/35">Service</dt>
                    <dd className="mt-1 text-sm text-white">{selectedMessage.service || 'Not provided'}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-white/35">Received</dt>
                    <dd className="mt-1 text-sm text-white">{formatDateTime(selectedMessage.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-white/35">Email delivery</dt>
                    <dd className="mt-1 text-sm text-white">
                      {selectedMessage.emailDelivery?.sent ? 'Sent' : selectedMessage.emailDelivery?.attempted ? 'Attempted' : 'Not attempted'}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <Label className="text-xs uppercase tracking-wide text-white/35">Message</Label>
                  <Textarea
                    value={selectedMessage.message}
                    readOnly
                    className="mt-2 min-h-48 resize-none border-white/10 bg-black/20 text-sm leading-7 text-white"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    onClick={() => replyToMessage(selectedMessage)}
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  >
                    <Mail className="h-4 w-4" />
                    Reply
                  </Button>
                  {selectedMessage.emailDelivery?.error && (
                    <div className="rounded-md border border-red-400/20 bg-red-400/10 px-3 py-2 text-sm text-red-100">
                      {selectedMessage.emailDelivery.error}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-80 items-center justify-center text-sm text-white/45">Select a message to view details.</div>
            )}
          </div>
        </section>
      ) : (
        <section className="mt-6 rounded-lg border border-white/10 bg-white/[0.04] p-5">
          <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-5">
            <div>
              <h2 className="font-semibold text-white">Site Settings</h2>
              <p className="mt-1 text-sm text-white/45">Public contact details and access controls</p>
            </div>
            <CalendarClock className="h-5 w-5 text-secondary" />
          </div>

          <form onSubmit={saveSettings} className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="siteName" className="text-white/70">Site name</Label>
              <Input
                id="siteName"
                value={settingsForm.siteName}
                onChange={(event) => handleSettingsChange('siteName', event.target.value)}
                className="border-white/10 bg-black/20 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-white/70">Contact email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settingsForm.contactEmail}
                onChange={(event) => handleSettingsChange('contactEmail', event.target.value)}
                className="border-white/10 bg-black/20 text-white"
                required
              />
            </div>
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="calendlyUrl" className="text-white/70">Calendly URL</Label>
              <div className="flex gap-2">
                <Input
                  id="calendlyUrl"
                  type="url"
                  value={settingsForm.calendlyUrl}
                  onChange={(event) => handleSettingsChange('calendlyUrl', event.target.value)}
                  className="border-white/10 bg-black/20 text-white"
                  required
                />
                <Button
                  type="button"
                  asChild
                  variant="outline"
                  size="icon"
                  className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={settingsForm.calendlyUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="text-white/70">LinkedIn</Label>
              <Input
                id="linkedin"
                type="url"
                value={settingsForm.socialLinks.linkedin}
                onChange={(event) => handleSocialChange('linkedin', event.target.value)}
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="upwork" className="text-white/70">Upwork</Label>
              <Input
                id="upwork"
                type="url"
                value={settingsForm.socialLinks.upwork}
                onChange={(event) => handleSocialChange('upwork', event.target.value)}
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-white/70">WhatsApp</Label>
              <Input
                id="whatsapp"
                type="url"
                value={settingsForm.socialLinks.whatsapp}
                onChange={(event) => handleSocialChange('whatsapp', event.target.value)}
                className="border-white/10 bg-black/20 text-white"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center justify-between rounded-md border border-white/10 bg-black/20 p-3">
                <span>
                  <span className="block text-sm font-medium text-white">Require auth</span>
                  <span className="mt-1 block text-xs text-white/40">Protect public site</span>
                </span>
                <Switch
                  checked={settingsForm.authRequired}
                  onCheckedChange={(value) => handleSettingsChange('authRequired', value)}
                />
              </label>
              <label className="flex items-center justify-between rounded-md border border-white/10 bg-black/20 p-3">
                <span>
                  <span className="block text-sm font-medium text-white">Maintenance</span>
                  <span className="mt-1 block text-xs text-white/40">Show offline page</span>
                </span>
                <Switch
                  checked={settingsForm.maintenanceMode}
                  onCheckedChange={(value) => handleSettingsChange('maintenanceMode', value)}
                />
              </label>
            </div>
            <div className="flex justify-end lg:col-span-2">
              <Button type="submit" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={isSavingSettings}>
                {isSavingSettings ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save settings
              </Button>
            </div>
          </form>
        </section>
      )}
    </AdminShell>
  );
}
