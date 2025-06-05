import React, { FormEvent, useRef, useState } from 'react';
import { Briefcase, Code, Database, MessageSquare, Award, GraduationCap, ChevronDown, ExternalLink, Github } from 'lucide-react';
import ContactModal from './ContactModal';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    try {
      setIsSubmitting(true);
      
      const result = await emailjs.sendForm(
        'service_0n1h0op',
        'template_4xx45u8',
        formRef.current,
        'ZKPu41UmtOveXFwmj'
      );
      
      if (result.text === 'OK') {
        toast.success('Mensagem enviada com sucesso!');
        formRef.current.reset();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error('Erro: Esqueci de pagar os e-mails KAKSKASKAKSAKS');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
<div className="min-h-screen bg-[url('/teste1.png')] bg-[length:100%_100%] bg-cover bg-center text-white p-4 md:p-8 font-sans">
 <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formRef={formRef}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />    <div className="h-screen relative flex flex-col items-center justify-center p-4 md:p-8">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            Gabriel Vinícius
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 font-light max-w-2xl mx-auto">
            Desenvolvedor Full-Stack apaixonado por criar experiências digitais excepcionais
          </p>
        </div>
        
        <div className="absolute bottom-12 animate-bounce">
          <a 
            href="#about"
             onClick={(e) => { e.preventDefault(); document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });}}
            className="flex flex-col items-center gap-2 text-purple-200 hover:text-white transition-colors"
          >
            <span className="text-sm font-medium">Scroll para descobrir</span>
            <ChevronDown size={24} />
          </a>
        </div>
      </div>
      <div id='about' className="max-w-5xl mx-auto">
        <header className="text-center py-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Sobre mim
          </h1>
          <div className="w-24 h-1 bg-purple-400 mx-auto mb-8 rounded-full"></div>
        </header>

        <div className="relative mb-16 overflow-hidden">
          <div className="rounded-xl overflow-hidden mb-4 shadow-2xl">
            <div className="bg-gradient-to-r from-indigo-800 to-purple-900 h-48 md:h-64 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute inset-0">
              <div className="w-full h-full bg-[url('/fluid.jpg')] bg-cover bg-center absolute inset-0"></div>

              
            </div>

            </div>
            
            <div className="relative z-10 -mt-20 px-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  {/* Profile Image */}
                  <div className="-mt-16 md:-mt-24 flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-purple-600 overflow-hidden shadow-lg">
                        <img 
                        src="/eu.jpg" 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />

                      </div>
                      <div className="absolute -right-1 -bottom-1 bg-green-500 w-5 h-5 rounded-full border-2 border-purple-900"></div>
                    </div>
                  </div>
                  
                  {/* Bio Content */}
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">Gabriel Vinícius</h2>
                    <p className="text-purple-300 mb-3 flex items-center justify-center md:justify-start gap-2">
                      <Code size={18} className="inline" />
                      <span>Desenvolvedor Full-Stack</span>
                    </p>
                    
                    <p className="text-base leading-relaxed mb-4">
                      Sou um desenvolvedor apaixonado por criar soluções inovadoras e escaláveis. Com expertise em .NET e SQL, complementada por um amplo conhecimento em tecnologias modernas, estou sempre em busca de novos desafios que me permitam evoluir profissionalmente. Minha abordagem combina excelência técnica com habilidades interpessoais bem desenvolvidas, garantindo colaboração eficaz em equipes multidisciplinares.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <span className="px-3 py-1 bg-indigo-700/50 rounded-full text-sm font-medium">.NET</span>
                      <span className="px-3 py-1 bg-indigo-700/50 rounded-full text-sm font-medium">SQL</span>
                      <span className="px-3 py-1 bg-indigo-700/50 rounded-full text-sm font-medium">Angular</span>
                      <span className="px-3 py-1 bg-indigo-700/50 rounded-full text-sm font-medium">Node.js</span>
                      <span className="px-3 py-1 bg-indigo-700/50 rounded-full text-sm font-medium">Azure</span>
                      <span className="px-3 py-1 bg-indigo-700/50 rounded-full text-sm font-medium">AWS</span>
                      <span className="px-3 py-1 bg-indigo-700/50 rounded-full text-sm font-medium">Docker</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Minha Trajetória</h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500/30"></div>
            
            {/* Timeline Items */}
            <div className="flex flex-col gap-12">
              {/* 2021 */}
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-600 w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-center mb-4 mt-2">
                  <span className="text-xl font-semibold bg-purple-900/60 px-4 py-1 rounded-full">2021</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <GraduationCap className="text-purple-400 flex-shrink-0" />
                    <h4 className="text-lg font-semibold">Formação em Desenvolvimento Web</h4>
                  </div>
                  <p className="text-purple-100">Iniciei minha formação em desenvolvimento web com foco em tecnologias Microsoft. Desenvolvi projetos práticos que solidificaram meu conhecimento em .NET Core e SQL Server.</p>
                </div>
              </div>
              
              {/* 2022 */}
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-600 w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-center mb-4 mt-2">
                  <span className="text-xl font-semibold bg-purple-900/60 px-4 py-1 rounded-full">2022</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <Briefcase className="text-purple-400 flex-shrink-0" />
                    <h4 className="text-lg font-semibold">Primeiro Projeto Enterprise</h4>
                  </div>
                  <p className="text-purple-100">Participei do desenvolvimento de uma aplicação empresarial de grande porte, aprimorando minhas habilidades em arquitetura de software e práticas de DevOps.</p>
                </div>
              </div>
              
              {/* 2023 */}
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-600 w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-center mb-4 mt-2">
                  <span className="text-xl font-semibold bg-purple-900/60 px-4 py-1 rounded-full">2023</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="text-purple-400 flex-shrink-0" />
                    <h4 className="text-lg font-semibold">Especialização Full-Stack</h4>
                  </div>
                  <p className="text-purple-100">Expandi meus conhecimentos para o desenvolvimento full-stack, incorporando tecnologias frontend modernas como Angular e JQuery ao meu repertório técnico.</p>
                </div>
              </div>
              
              {/* 2024 */}
              <div className="relative">
                <div className="flex items-center justify-center">
                  <div className="bg-purple-600 w-8 h-8 rounded-full z-10 flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-center mb-4 mt-2">
                  <span className="text-xl font-semibold bg-purple-900/60 px-4 py-1 rounded-full">2024</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/10 shadow-lg max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-3">
                    <Database className="text-purple-400 flex-shrink-0" />
                    <h4 className="text-lg font-semibold">Projetos na Nuvem e DevOps</h4>
                  </div>
                  <p className="text-purple-100">Atualmente estou focado em arquiteturas cloud-native e práticas avançadas de CI/CD, explorando novas tecnologias para desenvolvimento de aplicações modernas e escaláveis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-16">
            <h3 className="text-2xl font-bold mb-8 text-center">Projetos em Destaque</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Project 1 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/8728388/pexels-photo-8728388.jpeg" 
                    alt="E-commerce Project" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">Download de áudio e vídeos</h4>
                  <p className="text-purple-200 mb-4">Uma plataforma completa de baixar áudio e vídeo do YouTube construída com .NET Core, incluindo histórico de downloads.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-purple-900/50 rounded-md text-xs font-medium">.NET Core</span>
                  </div>
                  <div className="flex gap-4">
                    <a target='_blank' href="https://github.com/GabrielAstra/YtbDownlMvc.git" className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
                      <Github size={18} />
                      <span>Código</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Project 2 */}
              <div className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 shadow-xl transition-all duration-300 hover:transform hover:scale-[1.02]">
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/8728558/pexels-photo-8728558.jpeg" 
                    alt="Task Management Project" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">Discipulus</h4>
                  <p className="text-purple-200 mb-4">Site para aula de reforços online, onde o usuário pode criar uma conta e contratar um professor da matéria desejada.</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-purple-900/50 rounded-md text-xs font-medium">Flutter</span>
                    <span className="px-2 py-1 bg-purple-900/50 rounded-md text-xs font-medium">Asp.NET Core</span>
                    <span className="px-2 py-1 bg-purple-900/50 rounded-md text-xs font-medium">PostgreSql</span>
                  </div>
                  <div className="flex gap-4">
                    <a href="#" className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
                      <Github size={18} />
                      <span>Código</span>
                    </a>
                    <a href="#" className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors">
                      <ExternalLink size={18} />
                      <span>Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* Skills & Contact */}
        <div className="mb-16">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-center">Minhas Habilidades</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Code size={20} className="text-purple-400" />
                  Habilidades Técnicas
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span>.NET / C#</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>SQL / Banco de Dados</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>React / TypeScript</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>DevOps / CI/CD</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Cloud (Azure/AWS)</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Award size={20} className="text-purple-400" />
                  Soft Skills
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-center justify-between">
                    <span>Trabalho em Equipe</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Comunicação</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Resolução de Problemas</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Gestão de Tempo</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Adaptabilidade</span>
                    <div className="w-48 bg-purple-900/50 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* CTA */}
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
                <MessageSquare size={20} className="text-purple-400" />
                Vamos Trabalhar Juntos?
              </h4>
              <p className="mb-6 max-w-2xl mx-auto">
                Estou sempre aberto a novos projetos desafiadores e oportunidades de colaboração. Se meu perfil corresponde ao que você procura, entre em contato para discutirmos como posso contribuir para o sucesso do seu projeto.
              </p>
           <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full text-white font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <MessageSquare size={18} />
                Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function setIsModalOpen(arg0: boolean): void {
  throw new Error('Function not implemented.');
}
function setIsSubmitting(arg0: boolean) {
  throw new Error('Function not implemented.');
}

