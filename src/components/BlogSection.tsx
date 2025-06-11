import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Tag, Search, Filter, BookOpen, ArrowRight, Eye, Heart, MessageCircle, Share2 } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  views: number;
  likes: number;
  comments: number;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Explorando Clean Architecture em .NET",
    excerpt: "Uma análise profunda dos princípios da Clean Architecture e como implementá-la em projetos .NET para criar aplicações mais maintíveis e testáveis.",
    content: "A Clean Architecture é um padrão arquitetural que promove a separação de responsabilidades e a independência de frameworks...",
    date: "2024-01-15",
    readTime: "8 min",
    category: "Arquitetura",
    tags: [".NET", "Clean Architecture", "Design Patterns"],
    image: "/netArch.jpg",
    views: 1250,
    likes: 89,
    comments: 23
  },
  {
    id: 2,
    title: "Microserviços com Docker e Kubernetes",
    excerpt: "Guia completo para containerização de aplicações .NET e orquestração com Kubernetes, incluindo melhores práticas de DevOps.",
    content: "Os microserviços revolucionaram a forma como desenvolvemos aplicações enterprise...",
    date: "2024-01-10",
    readTime: "12 min",
    category: "DevOps",
    tags: ["Docker", "Kubernetes", "Microservices"],
    image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg",
    views: 2100,
    likes: 156,
    comments: 45
  },
  {
    id: 3,
    title: "React Hooks Avançados: useCallback e useMemo",
    excerpt: "Otimização de performance em React através do uso correto de hooks de memoização e suas implicações na renderização.",
    content: "A otimização de performance em React é crucial para aplicações de grande escala...",
    date: "2024-01-05",
    readTime: "6 min",
    category: "Frontend",
    tags: ["React", "Performance", "Hooks"],
    image: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg",
    views: 890,
    likes: 67,
    comments: 18
  },
  {
    id: 4,
    title: "Entity Framework Core: Otimizações Avançadas",
    excerpt: "Técnicas avançadas para otimizar consultas no EF Core, incluindo lazy loading, eager loading e split queries.",
    content: "O Entity Framework Core oferece diversas estratégias para otimização de consultas...",
    date: "2023-12-28",
    readTime: "10 min",
    category: "Backend",
    tags: ["EF Core", "SQL", "Performance"],
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
    views: 1560,
    likes: 112,
    comments: 34
  },
  {
    id: 5,
    title: "TypeScript: Tipos Avançados e Utility Types",
    excerpt: "Explorando recursos avançados do TypeScript para criar código mais robusto e type-safe em aplicações complexas.",
    content: "TypeScript oferece um sistema de tipos poderoso que vai muito além dos tipos básicos...",
    date: "2023-12-20",
    readTime: "7 min",
    category: "Frontend",
    tags: ["TypeScript", "Types", "JavaScript"],
    image: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg",
    views: 1340,
    likes: 98,
    comments: 27
  },
  {
    id: 6,
    title: "CI/CD com Azure DevOps e GitHub Actions",
    excerpt: "Implementando pipelines robustos de integração e entrega contínua para projetos .NET usando Azure DevOps e GitHub Actions.",
    content: "A implementação de CI/CD é fundamental para o desenvolvimento moderno...",
    date: "2023-12-15",
    readTime: "15 min",
    category: "DevOps",
    tags: ["Azure DevOps", "GitHub Actions", "CI/CD"],
    image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg",
    views: 1890,
    likes: 134,
    comments: 41
  }
];

const categories = ["Todos", "Arquitetura", "DevOps", "Frontend", "Backend"];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const blogRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
              entry.target.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
            }, index * 150);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    blogRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add('opacity-0', 'translate-y-8', 'scale-95', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [selectedCategory, searchTerm]);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openPost = (post: BlogPost) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div id="blog" className="min-h-screen p-4 md:p-8 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center py-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight hover:text-gray-300 transition-colors duration-300">
            Blog de Estudos
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8 rounded-full animate-pulse"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Compartilhando conhecimentos, experiências e descobertas no mundo do desenvolvimento de software
          </p>
        </header>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" size={20} />
                <input
                  type="text"
                  placeholder="Buscar posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors placeholder-white/50 hover:bg-white/10"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      selectedCategory === category
                        ? 'bg-white text-black shadow-lg'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              ref={el => blogRefs.current[index] = el}
              className="group bg-black/60 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-white/10 cursor-pointer"
              onClick={() => openPost(post)}
            >
              {/* Post Image */}
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-black">
                    {post.category}
                  </span>
                </div>

                {/* Stats Overlay */}
                <div className="absolute bottom-4 right-4 flex gap-3 text-white/80">
                  <div className="flex items-center gap-1 text-xs">
                    <Eye size={14} />
                    <span>{post.views}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <Heart size={14} />
                    <span>{post.likes}</span>
                  </div>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-300 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-md text-xs font-medium hover:bg-white/20 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-300 group-hover:text-white transition-colors">
                    <BookOpen size={16} />
                    <span className="text-sm font-medium">Ler mais</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  
                  <div className="flex items-center gap-1 text-gray-400">
                    <MessageCircle size={14} />
                    <span className="text-xs">{post.comments}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={64} className="mx-auto text-white/30 mb-4" />
            <h3 className="text-2xl font-semibold mb-2">Nenhum post encontrado</h3>
            <p className="text-gray-300">Tente ajustar os filtros ou termo de busca</p>
          </div>
        )}
      </div>

      {/* Blog Post Modal */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-black/80 backdrop-blur-md rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20 shadow-xl relative animate-scale-in">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 z-10 text-white/80 hover:text-white transition-colors hover:rotate-90 transform duration-300 bg-black/50 rounded-full p-2"
            >
              <ArrowRight size={24} className="rotate-45" />
            </button>

            {/* Modal Header Image */}
            <div className="h-64 md:h-80 relative overflow-hidden rounded-t-2xl">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-16">
                <div className="flex items-center gap-2 text-gray-300 mb-2">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-black">
                    {selectedPost.category}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {selectedPost.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{new Date(selectedPost.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{selectedPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>{selectedPost.views}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="prose prose-invert prose-white max-w-none">
                <p className="text-lg leading-relaxed text-gray-200 mb-6">
                  {selectedPost.excerpt}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {selectedPost.content}
                </p>
                
                {/* Placeholder for more content */}
                <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/20">
                  <p className="text-gray-300 italic">
                    Em breve.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <Heart size={18} />
                    <span>{selectedPost.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                    <MessageCircle size={18} />
                    <span>{selectedPost.comments}</span>
                  </button>
                </div>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                  <Share2 size={18} />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}