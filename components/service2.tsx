"use client";

const Service2 = () => {
  return (
    <section className="pb-8 w-full">
      {/* Full Width Hero with Background Image */}
      <div
        className="relative flex min-h-[500px] items-center justify-center bg-cover bg-center bg-no-repeat py-32"
        style={{
          backgroundImage: "url('/IMG_8997.jpg')",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="container relative z-10 text-center">
          <h1 className="text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl">
            UX/UI Design
          </h1>
        </div>
      </div>

      {/* Intro Section */}
      {/* <div className="py-16 flex items-center justify-center">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8 text-left">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
              User-Centered Design That Converts
            </h2>
            <p className="text-muted-foreground text-xl leading-relaxed">
              We believe that great design should be intuitive, accessible, and
              purposeful for every user who interacts with your product. Our
              UX/UI design approach focuses on understanding your users' needs,
              behaviors, and pain points to create interfaces that not only look
              beautiful but function seamlessly.
            </p>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export { Service2 };
