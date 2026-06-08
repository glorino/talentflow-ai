"use client";

import MarketingLayout from "@/components/marketing-layout";
import {
  Clock,
  User,
  ArrowRight,
  Tag,
  BookOpen,
  Sparkles,
  TrendingUp,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const categories = ["All", "HR Tech", "AI", "Compliance", "Culture", "Payroll", "Leadership"];

const featuredPost = {
  title: "The Future of HR: How AI Agents Are Transforming People Operations in 2026",
  excerpt:
    "From automated screening to predictive analytics, AI agents are reshaping every aspect of human resources. We explore the technology behind TalentFlow's 9 specialized agents and how they're reducing HR workload by 60%.",
  category: "AI",
  author: "Sarah Chen",
  initials: "SC",
  date: "Jun 5, 2026",
  readTime: "12 min read",
  gradient: "from-blue-600 via-purple-600 to-indigo-700",
};

const posts = [
  {
    title: "5 Compliance Pitfalls Every HR Team Should Watch in 2026",
    excerpt:
      "New labor laws, updated EEOC guidelines, and evolving state regulations are creating a minefield for HR departments. Here's how to stay ahead.",
    category: "Compliance",
    author: "Marcus Williams",
    initials: "MW",
    date: "Jun 3, 2026",
    readTime: "8 min read",
    gradient: "from-emerald-500 to-teal-600",
    icon: Tag,
  },
  {
    title: "Building a High-Performance Culture in a Remote-First World",
    excerpt:
      "Remote work is here to stay. Learn how leading companies are building thriving cultures without a shared office space.",
    category: "Culture",
    author: "Priya Patel",
    initials: "PP",
    date: "Jun 1, 2026",
    readTime: "6 min read",
    gradient: "from-rose-500 to-pink-600",
    icon: BookOpen,
  },
  {
    title: "Payroll Automation: Saving 40+ Hours Every Month",
    excerpt:
      "Manual payroll processing is error-prone and time-consuming. Discover how automated payroll systems are transforming back-office operations.",
    category: "Payroll",
    author: "David Kim",
    initials: "DK",
    date: "May 28, 2026",
    readTime: "7 min read",
    gradient: "from-amber-500 to-orange-600",
    icon: TrendingUp,
  },
  {
    title: "Why Employee Experience Is the New Competitive Advantage",
    excerpt:
      "Top talent has options. Companies that invest in employee experience see 40% lower turnover and 21% higher productivity.",
    category: "Leadership",
    author: "Elena Rodriguez",
    initials: "ER",
    date: "May 25, 2026",
    readTime: "5 min read",
    gradient: "from-violet-500 to-purple-600",
    icon: Sparkles,
  },
  {
    title: "AI-Powered Recruitment: From Job Post to Offer Letter in 48 Hours",
    excerpt:
      "Traditional hiring takes 45 days on average. AI screening, automated interviews, and smart matching can compress that timeline dramatically.",
    category: "HR Tech",
    author: "James O'Brien",
    initials: "JO",
    date: "May 22, 2026",
    readTime: "9 min read",
    gradient: "from-cyan-500 to-blue-600",
    icon: Search,
  },
  {
    title: "The ROI of People Analytics: Data-Driven HR Decisions",
    excerpt:
      "HR teams that leverage people analytics make 5x faster decisions and see measurable improvements in retention, engagement, and hiring quality.",
    category: "AI",
    author: "Sarah Chen",
    initials: "SC",
    date: "May 19, 2026",
    readTime: "10 min read",
    gradient: "from-indigo-500 to-blue-600",
    icon: TrendingUp,
  },
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [email, setEmail] = useState("");

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 text-sm font-medium shadow-sm mb-6">
            <BookOpen size={14} className="text-primary" />
            <span>Insights & Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            TalentFlow <span className="text-primary">Blog</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert insights on HR technology, AI-driven people operations,
            compliance best practices, and building world-class teams.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={cn(
              "rounded-3xl bg-gradient-to-br p-10 md:p-14 text-white relative overflow-hidden",
              featuredPost.gradient
            )}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold mb-6">
                {featuredPost.category}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 max-w-3xl">
                {featuredPost.title}
              </h2>
              <p className="text-white/80 text-lg max-w-2xl mb-8">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold">
                    {featuredPost.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{featuredPost.author}</p>
                    <p className="text-xs text-white/60">{featuredPost.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <Clock size={14} />
                  {featuredPost.readTime}
                </div>
                <button className="flex items-center gap-2 rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold hover:bg-white/30 transition-colors ml-auto">
                  Read Article
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => {
              const Icon = post.icon;
              return (
                <article
                  key={post.title}
                  className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white",
                        `bg-gradient-to-r ${post.gradient}`
                      )}
                    >
                      <Icon size={12} />
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white",
                          `bg-gradient-to-br ${post.gradient}`
                        )}
                      >
                        {post.initials}
                      </div>
                      <span className="text-sm font-medium">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {post.readTime}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 mb-6">
            <Sparkles size={24} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Stay ahead of the curve
          </h2>
          <p className="text-muted-foreground mb-8">
            Get the latest HR tech insights, AI trends, and people operations
            best practices delivered to your inbox every week.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-xl border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Subscribe
              <ArrowRight size={14} />
            </button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe anytime. Join 2,400+ HR leaders.
          </p>
        </div>
      </section>
    </MarketingLayout>
  );
}
