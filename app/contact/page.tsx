import Header from '@/components/Header';
import SimpleFooter from '@/components/SimpleFooter';
import '../../styles/normalize.css';
import '../../styles/premium.css';

export const metadata = {
  title: 'Contact - AllHalal',
  description: 'Get in touch with AllHalal team',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      
      <section className="minimal-hero" style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '80px'
      }}>
        <div className="container">
          <h1 className="hero-title-new" style={{fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--space-6)'}}>
            Contact
          </h1>
          <p className="section-description" style={{fontSize: '1.25rem'}}>
            Email: <a 
              href="mailto:contact@allhalal.info" 
              className="text-highlight" 
              style={{color: 'var(--white)', textDecoration: 'none'}}
            >
              contact@allhalal.info
            </a>
          </p>
        </div>
      </section>

      <SimpleFooter />
    </>
  );
}

