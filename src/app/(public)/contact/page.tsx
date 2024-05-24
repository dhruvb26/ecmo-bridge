import { ContactForm } from "../_components/contact-form";
export default function AboutPage() {
  return (
    <>
      <div className="bg-gradient-to-b from-primary-purple-900 via-primary-purple-500 to-primary-purple-300">
        <section className="relative min-h-screen pb-10 pt-24 sm:pb-16 sm:pt-32 lg:pb-24">
          <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto  text-center">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
