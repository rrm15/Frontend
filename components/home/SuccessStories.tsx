export default function SuccessStories() {
  const stories = [
    {
      name: "Lakshmi SHG",
      location: "Tamil Nadu",
      quote: "Wemace helped us access financial services we never had before. Our group has grown significantly since joining.",
      image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&q=80"
    },
    {
      name: "Shakti Women's Group",
      location: "Maharashtra",
      quote: "The blockchain technology gave us transparency and trust in our operations. We've doubled our impact in just one year.",
      image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Success Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <div key={i} className="bg-card text-card-foreground rounded-xl shadow-lg overflow-hidden border border-border">
              <div className="h-48 overflow-hidden">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <blockquote className="text-lg mb-4">&ldquo;{story.quote}&rdquo;</blockquote>
                <p className="font-bold">{story.name}</p>
                <p className="text-muted-foreground">{story.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}