import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Briefcase, Code, Database, MessageSquare, Award, GraduationCap, Mail, Phone, MapPin, X, ChevronDown, Github, ExternalLink, Download, Linkedin, Twitter, BookOpen } from 'lucide-react';
import { type Container, type Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import BlogSection from './components/BlogSection';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState('');
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);

  const fullText = "Desenvolvedor Full-Stack apaixonado por criar experiências digitais excepcionais";

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
              entry.target.classList.remove('opacity-0', 'translate-y-8', 'scale-95');
            }, index * 200);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    timelineRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add('opacity-0', 'translate-y-8', 'scale-95', 'transition-all', 'duration-700', 'ease-out');
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send(
        'service_0n1h0op',
        'template_4xx45u8',
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        'ZKPu41UmtOveXFwmj'
      );

      toast.success('Mensagem enviada com sucesso!');
      setFormData({ name: '', email: '', message: '' });
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCV = () => {
    const link = document.createElement('a');
    link.href = '/PDFs/GabrielCV.pdf';
    link.download = 'GabrielCV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CV baixado com sucesso!');
  };

  const scrollToBlog = () => {
    document.getElementById('blog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-white font-sans relative overflow-x-hidden">
      <Toaster position="top-right" />
      
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0 transition-transform duration-1000 ease-out"
        style={{ 
          backgroundImage: 'url("/blackFluidLeve.png")',
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) scale(1.05)`
        }}
      />
      <div className="fixed inset-0 bg-black/20 z-10" />
      

      <div className="relative z-30">
        {/* Navigation */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40">
          <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 shadow-xl">
            <div className="flex items-center gap-6">
              <a href="#home" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Início
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Sobre
              </a>
              <button 
                onClick={scrollToBlog}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
              >
                <BookOpen size={16} />
                Blog
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                Contato
              </button>
            </div>
          </div>
        </nav>

        {/* Floating Action Buttons */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
          <button
            onClick={downloadCV}
            className="group bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            title="Download CV"
          >
            <Download size={20} className="text-gray-300 group-hover:text-white" />
          </button>
          <a
            href="https://github.com/GabrielAstra"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 block"
            title="GitHub"
          >
            <Github size={20} className="text-gray-300 group-hover:text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/gabrielviniciusdev/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 block"
            title="LinkedIn"
          >
            <Linkedin size={20} className="text-gray-300 group-hover:text-white" />
          </a>
        </div>

        {/* Hero Section */}
        <div id="home" ref={heroRef} className="h-screen relative flex flex-col items-center justify-center p-4 md:p-8">
          <div className="text-center space-y-6">
            <h1 
              className="text-6xl md:text-8xl font-bold tracking-tighter animate-fade-in-up"
              style={{
                transform: `translateY(${mousePosition.y * -20}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              Gabriel Vinícius
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto h-16 flex items-center justify-center">
              <span className="inline-block">
                {displayText}
                {isTyping && <span className="animate-pulse">|</span>}
              </span>
            </div>
            
            {/* Animated Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">2+</div>
                <div className="text-sm text-gray-400">Anos de Experiência</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">25+</div>
                <div className="text-sm text-gray-400">Projetos Concluídos</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-3xl font-bold text-white group-hover:scale-110 transition-transform duration-300">15+</div>
                <div className="text-sm text-gray-400">Tecnologias</div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-12 animate-bounce">
            <a 
              href="#about"
              className="flex flex-col items-center gap-2 text-gray-300 hover:text-white transition-colors group"
            >
              <span className="text-sm font-medium group-hover:scale-105 transition-transform">Scroll para descobrir</span>
              <ChevronDown size={24} className="group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="min-h-screen p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <header className="text-center py-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight hover:text-gray-300 transition-colors duration-300">
                Sobre mim
              </h1>
              <div className="w-24 h-1 bg-white mx-auto mb-8 rounded-full animate-pulse"></div>
            </header>

            {/* Profile Card */}
            <div className="relative mb-16 overflow-hidden">
              <div className="rounded-xl overflow-hidden mb-4 shadow-2xl hover:shadow-white/10 transition-shadow duration-500">
                <div className="bg-gradient-to-r from-gray-900 to-gray-700 h-48 md:h-64 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-black opacity-30 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full max-w-4xl px-4">
                      <div className="w-full h-full bg-[url('/fluidColor.png')] bg-cover bg-center absolute inset-0 group-hover:scale-105 transition-transform duration-700"></div>
                    </div>
                  </div>
                </div>
                
                <div className="relative z-10 -mt-20 px-4">
                  <div className="bg-black/60 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:border-white/30 transition-all duration-300">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                      {/* Profile Image */}
                      <div className="-mt-16 md:-mt-24 flex-shrink-0">
                        <div className="relative group">
                          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-lg group-hover:border-gray-300 transition-colors duration-300">
                            <img 
                              src="/eu.jpg" 
                              alt="Profile" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="absolute -right-1 -bottom-1 bg-green-500 w-5 h-5 rounded-full border-2 border-black animate-pulse"></div>
                        </div>
                      </div>
                      
                      {/* Bio Content */}
                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold mb-2 hover:text-gray-300 transition-colors cursor-pointer">Gabriel Vinícius</h2>
                        <p className="text-gray-300 mb-3 flex items-center justify-center md:justify-start gap-2">
                          <Code size={18} className="inline animate-pulse" />
                          <span>Desenvolvedor Full-Stack</span>
                        </p>
                        
                        <p className="text-base leading-relaxed mb-4">
                          Sou um desenvolvedor apaixonado por criar soluções inovadoras e escaláveis. Com expertise em .NET e SQL, complementada por um amplo conhecimento em tecnologias modernas, estou sempre em busca de novos desafios que me permitam evoluir profissionalmente. Minha abordagem combina excelência técnica com habilidades interpessoais bem desenvolvidas, garantindo colaboração eficaz em equipes multidisciplinares.
                        </p>
                        
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {['.NET', 'SQL', 'React', 'Node.js', 'Azure'].map((tech, index) => (
                            <span 
                              key={tech}
                              className="px-3 py-1 bg-white/10 rounded-full text-sm font-medium hover:bg-white/20 transition-colors cursor-pointer hover:scale-105 transform duration-200"
                              style={{ animationDelay: `${index * 100}ms` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center hover:text-gray-300 transition-colors">Minha Trajetória</h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-white/20 via-white/40 to-white/20"></div>
                
                {/* Timeline Items */}
                <div className="flex flex-col gap-12">
                  {/* 2021 */}
                  <div 
                    ref={el => timelineRefs.current[0] = el}
                    className="relative group"
                  >
                    <div className="flex items-center justify-center">
                      <div className="bg-white w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                        <div className="w-3 h-3 bg-black rounded-full group-hover:animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-center mb-4 mt-2">
                      <span className="text-xl font-semibold bg-black/60 px-4 py-1 rounded-full group-hover:bg-black/70 transition-colors">2021</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg max-w-md mx-auto group-hover:border-white/30 group-hover:shadow-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <GraduationCap className="text-white flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                        <h4 className="text-lg font-semibold">Formação em Desenvolvimento Web</h4>
                      </div>
                      <p className="text-gray-300">Concluí minha formação em desenvolvimento web com foco em tecnologias Microsoft. Desenvolvi projetos práticos que solidificaram meu conhecimento em .NET Core e SQL Server.</p>
                    </div>
                  </div>
                  
                  {/* 2022 */}
                  <div 
                    ref={el => timelineRefs.current[1] = el}
                    className="relative group"
                  >
                    <div className="flex items-center justify-center">
                      <div className="bg-white w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                        <div className="w-3 h-3 bg-black rounded-full group-hover:animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-center mb-4 mt-2">
                      <span className="text-xl font-semibold bg-black/60 px-4 py-1 rounded-full group-hover:bg-black/70 transition-colors">2022</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg max-w-md mx-auto group-hover:border-white/30 group-hover:shadow-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <Briefcase className="text-white flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                        <h4 className="text-lg font-semibold">Primeiro Projeto Enterprise</h4>
                      </div>
                      <p className="text-gray-300">Participei do desenvolvimento de uma aplicação empresarial de grande porte, aprimorando minhas habilidades em arquitetura de software e práticas de DevOps.</p>
                    </div>
                  </div>
                  
                  {/* 2023 */}
                  <div 
                    ref={el => timelineRefs.current[2] = el}
                    className="relative group"
                  >
                    <div className="flex items-center justify-center">
                      <div className="bg-white w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                        <div className="w-3 h-3 bg-black rounded-full group-hover:animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-center mb-4 mt-2">
                      <span className="text-xl font-semibold bg-black/60 px-4 py-1 rounded-full group-hover:bg-black/70 transition-colors">2023</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg max-w-md mx-auto group-hover:border-white/30 group-hover:shadow-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <Award className="text-white flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                        <h4 className="text-lg font-semibold">Especialização Full-Stack</h4>
                      </div>
                      <p className="text-gray-300">Expandi meus conhecimentos para o desenvolvimento full-stack, incorporando tecnologias frontend modernas como React e TypeScript ao meu repertório técnico.</p>
                    </div>
                  </div>
                  
                  {/* 2024 */}
                  <div 
                    ref={el => timelineRefs.current[3] = el}
                    className="relative group"
                  >
                    <div className="flex items-center justify-center">
                      <div className="bg-white w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg group-hover:scale-125 transition-transform duration-300">
                        <div className="w-3 h-3 bg-black rounded-full group-hover:animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-center mb-4 mt-2">
                      <span className="text-xl font-semibold bg-black/60 px-4 py-1 rounded-full group-hover:bg-black/70 transition-colors">2024</span>
                    </div>
                    <div className="bg-black/60 backdrop-blur-sm p-5 rounded-xl border border-white/20 shadow-lg max-w-md mx-auto group-hover:border-white/30 group-hover:shadow-white/10 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <Database className="text-white flex-shrink-0 group-hover:rotate-12 transition-transform duration-300" />
                        <h4 className="text-lg font-semibold">Projetos na Nuvem e DevOps</h4>
                      </div>
                      <p className="text-gray-300">Atualmente estou focado em arquiteturas cloud-native e práticas avançadas de CI/CD, explorando novas tecnologias para desenvolvimento de aplicações modernas e escaláveis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Projects Section */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center hover:text-gray-300 transition-colors">Projetos em Destaque</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project 1 */}
                <div className="group bg-black/60 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-white/10">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src="/discipulus.PNG" 
                      alt="Discipulus" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">Discipulus</h4>
                    <p className="text-gray-300 mb-4">Site para aula de reforços online, onde o usuário pode criar uma conta e contratar um professor da matéria desejada.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs font-medium hover:bg-white/20 transition-colors">.NET Core</span>
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs font-medium hover:bg-white/20 transition-colors">Flutter</span>
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs font-medium hover:bg-white/20 transition-colors">PostgreSql</span>
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs font-medium hover:bg-white/20 transition-colors">Docker</span>                    </div>
                    <div className="flex gap-4">
                      <a href="https://github.com/GabrielAstra/YtbDownlMvc" target="_blank" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group/link">
                        <Github size={18} className="group-hover/link:rotate-12 transition-transform" />
                        <span>Código</span>
                      </a>
                      <a href="" title='Sem demonstração. (No momento)' className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group/link">
                        <ExternalLink size={18} className="group-hover/link:rotate-12 transition-transform" />
                        <span>Demo</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Project 2 */}
                <div className="group bg-black/60 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-xl transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-white/10">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src="/bogus.png" 
                      alt="Bogus" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/50 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">Bogus</h4>
                    <p className="text-gray-300 mb-4">Uma demonstração do uso da biblioteca Bogus, pode ser usada para gerar dados falsos que podem servir para diversos testes em massa.</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs font-medium hover:bg-white/20 transition-colors">ASP.NET</span>
                    </div>
                    <div className="flex gap-4">
                      <a href="https://github.com/GabrielAstra/BogusExample" target="_blank" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group/link">
                        <Github size={18} className="group-hover/link:rotate-12 transition-transform" />
                        <span>Código</span>
                      </a>
                      <a href="" title="Sem desmonstração. (No momento)" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group/link">
                        <ExternalLink size={18} className="group-hover/link:rotate-12 transition-transform" />
                        <span>Demo</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills & Contact */}
            <div className="mb-16">
              <div className="bg-black/60 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl hover:border-white/30 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-6 text-center hover:text-gray-300 transition-colors">Minhas Habilidades</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Code size={20} className="text-white animate-pulse" />
                      Habilidades Técnicas
                    </h4>
                    <ul className="space-y-3">
                      {[
                        { skill: '.NET / C#', level: 90 },
                        { skill: 'SQL / Banco de Dados', level: 85 },
                        { skill: 'React / TypeScript', level: 80 },
                        { skill: 'DevOps / CI/CD', level: 75 },
                        { skill: 'Cloud (Azure/AWS)', level: 70 }
                      ].map((item, index) => (
                        <li key={item.skill} className="flex items-center justify-between group">
                          <span className="group-hover:text-gray-300 transition-colors">{item.skill}</span>
                          <div className="w-48 bg-white/20 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full transition-all duration-1000 ease-out hover:from-gray-200 hover:to-white"
                              style={{ 
                                width: `${item.level}%`,
                                animationDelay: `${index * 200}ms`
                              }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <Award size={20} className="text-white animate-pulse" />
                      Soft Skills
                    </h4>
                    <ul className="space-y-3">
                      {[
                        { skill: 'Trabalho em Equipe', level: 95 },
                        { skill: 'Comunicação', level: 90 },
                        { skill: 'Resolução de Problemas', level: 85 },
                        { skill: 'Gestão de Tempo', level: 80 },
                        { skill: 'Adaptabilidade', level: 90 }
                      ].map((item, index) => (
                        <li key={item.skill} className="flex items-center justify-between group">
                          <span className="group-hover:text-gray-300 transition-colors">{item.skill}</span>
                          <div className="w-48 bg-white/20 rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-white to-gray-300 h-2 rounded-full transition-all duration-1000 ease-out hover:from-gray-200 hover:to-white"
                              style={{ 
                                width: `${item.level}%`,
                                animationDelay: `${index * 200}ms`
                              }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="text-center">
                  <h4 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                    <MessageSquare size={20} className="text-white animate-pulse" />
                    Vamos Trabalhar Juntos?
                  </h4>
                  <p className="mb-6 max-w-2xl mx-auto">
                    Estou sempre aberto a novos projetos desafiadores e oportunidades de colaboração. Se meu perfil corresponde ao que você procura, entre em contato para discutirmos como posso contribuir para o sucesso do seu projeto.
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-black rounded-full font-semibold shadow-lg hover:from-gray-200 hover:to-white transition-all duration-300 flex items-center gap-2 mx-auto hover:scale-105 transform"
                  >
                    <MessageSquare size={18} className="animate-pulse" />
                    Entrar em Contato
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <BlogSection />
      </div>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-black/60 backdrop-blur-md rounded-2xl p-6 md:p-8 w-full max-w-lg border border-white/20 shadow-xl relative animate-scale-in">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors hover:rotate-90 transform duration-300"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-2xl font-bold mb-6 text-center">Entre em Contato</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <Mail className="text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:gvlc2013@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                    gvlc2013@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <Phone className="text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <a href="tel:+5561985623626" className="text-gray-300 hover:text-white transition-colors">
                    +55 (61) 98562-3626
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
                <MapPin className="text-white flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-medium">Localização</p>
                  <p className="text-gray-300">Brasília, DF - Brasil</p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu Nome"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors placeholder-white/50 hover:bg-white/10"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Seu Email"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors placeholder-white/50 hover:bg-white/10"
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Sua Mensagem"
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-white/40 transition-colors placeholder-white/50 resize-none hover:bg-white/10"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-white to-gray-200 text-black rounded-lg font-semibold shadow-lg hover:from-gray-200 hover:to-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Mensagem'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;