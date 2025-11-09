import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin } from 'lucide-react';
import ProfileImg from '@/assets/profile.png';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-sky-600 to-sky-800 rounded-3xl p-12 flex flex-col md:flex-row items-center gap-8 shadow-xl overflow-hidden">
        <div className="flex-shrink-0">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              src={ProfileImg}
              alt="Pawara Navojith Gunathilaka"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center md:text-left text-white space-y-4">
          <h1 className="text-5xl font-extrabold">
            Pawara Navojith Gunathilaka
          </h1>
          <p className="text-lg max-w-xl">
            Full-stack developer specializing in backend engineering and
            cloud-native systems. 4+ years experience in building scalable,
            high-performance web and mobile applications.
          </p>
          <div className="flex justify-center md:justify-start gap-4 mt-4">
            <Button
              asChild
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-sky-700 dark:bg-neutral-900 "
            >
              <a
                href="https://github.com/Navojith"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 "
              >
                <Github /> GitHub
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-sky-700 dark:bg-neutral-900"
            >
              <a
                href="https://www.linkedin.com/in/pawara-navojith-aa607a208/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2"
              >
                <Linkedin /> LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact + Education */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-xl hover:shadow-2xl transition bg-gradient-to-tr from-pink-600 to-pink-900 text-white">
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Email:</strong> navojithpawara@gmail.com
            </p>
            <p>
              <strong>Phone:</strong> +94 713 197 055
            </p>
            <p>
              <strong>Address:</strong> 2D-1 Wathumulla, Udugampola, Gampaha,
              Sri Lanka
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xl hover:shadow-2xl transition bg-gradient-to-tr from-purple-700 to-pink-900 text-white">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>BSc (Hons) in IT (Software Engineering)</strong>
              <br />
              Sri Lanka Institute of Information Technology, Malabe (2021 -
              2025)
              <br />
              GPA: 3.8, First Class Honors, Merit Award NBQSA 2025, Dean’s List
              5 semesters
            </p>
            <p>
              <strong>School:</strong> Ananda College, Colombo 10 (2011 - 2020)
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Professional Summary */}
      <section>
        <Card className="shadow-xl hover:shadow-2xl transition bg-gradient-to-tr from-green-600 to-green-900 text-white">
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            Full-stack developer with 4+ years of experience specializing in
            backend engineering and cloud-native systems. Skilled in NestJS,
            Node.js, React, .NET, Java, Python, Docker, Kubernetes, and AWS.
            Proven ability to architect robust microservice solutions, optimize
            system performance, and deliver production-grade software across web
            and mobile platforms.
          </CardContent>
        </Card>
      </section>

      {/* Experience */}
      <section className="space-y-6">
        <Card className="shadow-xl hover:shadow-2xl transition bg-gradient-to-tr from-sky-700 to-teal-900 text-white">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>HP Innovations - Associate Software Engineer</strong> (Jul
              2025 – Present)
              <br />
              Full-stack engineer on scalable travel platform using NestJS,
              React, PostgreSQL, Docker, Kafka, Kubernetes, AWS. Designed
              modular, high-performance systems and WebSocket live chat modules.
            </div>
            <div>
              <strong>Freelance & Projects</strong> (2021 – 2025)
              <br />
              Projects include Effluo, LuckyDice, CourseRealm, Retina, Spendzy,
              EduAuth, full-stack, AR/VR, AI-powered solutions.
            </div>
            <div>
              <strong>Insighture - Intern Full-Stack Developer</strong> (Oct
              2023 – Oct 2024)
              <br />
              Developed cloud-native platform features, containerized
              microservices, automated testing pipelines, integrated analytics &
              monitoring services.
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Leadership & Activities */}
      <section className="space-y-6">
        <Card className="shadow-xl hover:shadow-2xl transition bg-gradient-to-tr from-indigo-700 to-purple-900 text-white">
          <CardHeader>
            <CardTitle>Leadership & Activities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              SLIIT FOSS Community - Development Team Member (Apr 2023 – Jul
              2025)
            </p>
            <p>
              MS Club of SLIIT - Development Team Member (Mar 2023 – Oct 2024)
            </p>
            <p>Ananda College ICT Society - Secretary (Apr 2018 – Mar 2019)</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
