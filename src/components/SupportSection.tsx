
import { Button } from "@/components/ui/button";

const SupportSection = () => {
  return (
    <section id="support" className="py-20 bg-primary/10">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Support?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of support and start your journey to better mental health today.
            Remember, you're never alone.
          </p>
          <Button size="lg" className="hover-scale">
            Start Chatting Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
