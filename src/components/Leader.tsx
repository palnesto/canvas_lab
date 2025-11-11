export default function XPOLLLeadership({
  heroImage = "/leader.jpeg",
  title = "XPoll Leadership",
  subtitle = "Stanton Terranova",
  role = "CEO",
  linkedin = "https://www.linkedin.com/in/stanton-terranova-30002025/",
  description = "Stanton Terranova is a New York-based attorney, entrepreneur, and blockchain innovator leading XPOLL at the forefront of decentralized finance and digital governance. A top graduate of the University of Rhode Island and holder of a Juris Doctorate in maritime law, Stanton brings deep expertise in law, business, and real estate. As the founder of XPOLL and GreatRWB, he has driven the development of platforms that reshape global participation in the Web3 economy. Beyond tech and law, Stanton is also a committed farmer, reflecting his passion for sustainability and innovation across industries.",
  profiles = [
    {
      src: "/leader1.png",
      alt: "Jane Doe, CTO",
      name: "Rishabh Hurshan",
      role: "CTO",
      linkedin: "https://www.linkedin.com/in/rishabh-hurshan-a2055a21/",
    },
    {
      src: "/leader2.png",
      alt: "John Smith, COO",
      name: "Srivatsava",
      role: "CSO",
      linkedin: "https://www.linkedin.com/in/srivatsava-murthy/",
    },
  ],
}) {
  return (
    <section className="pt-16 pb-32">
      <div className="flex justify-center px-8 md:px-16">
        <div className="max-w-7xl w-full">
          <div className="flex flex-col md:flex-row items-center text-center md:text-start bg-[#F7F9FC] rounded-xl overflow-hidden shadow-2xl">
            <img
              src={heroImage}
              alt={title}
              className="sm:w-1/2 h-auto object-cover md:p-7 rounded-xl"
            />
            <div className="p-4 md:p-6 md:w-1/2 text-[#23262D] font-bold">
              <h2 className="text-2xl md:text-3xl pb-2">{title}</h2>
              <h3 className="text-lg md:text-2xl">{subtitle}</h3>
              <p className="text-lg flex gap-2 items-center py-1">
                {role}
                <a href={linkedin} target="_blank" className="w-5 h-5">
                  <img src="/linked.png" alt="linkedin" />
                </a>
              </p>
              <p className="text-[#566171] text-xs sm:text-sm lg:text-base font-medium text-justify">
                {description}
              </p>
            </div>
          </div>

          <div className="pt-16 grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-7 justify-items-center">
            {profiles.map((profile, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center w-80 md:w-64"
              >
                <img
                  src={profile.src}
                  alt={profile.alt}
                  className="w-full h-auto object-cover rounded-lg shadow-sm"
                />
                <h1 className="text-xs pt-2 md:text-xl font-akira">
                  {profile.name}
                </h1>
                <p className="text-base md:text-lg font-bold flex gap-2 items-center">
                  {profile.role}
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    className="w-5 h-5"
                  >
                    <img src="/linked.png" alt="linkedin" />
                  </a>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <h3 className="pb-5 text-3xl text-center md:text-6xl font-extrabold tracking-tight pt-10">
        How can we help you?
      </h3>
      <a
        href="mailto:stanton@canvaslabs.world"
        className="text-center text-lg sm:text-xl md:text-4xl font-semibold hover:underline"
      >
        <p> stanton@canvaslabs.world</p>
      </a>
      <a
        href="tel:+18606550095"
        className="text-center sm:text-lg md:text-3xl font-semibold hover:underline"
      >
        <p>Phone: +1 860 655 0095</p>
      </a>
    </section>
  );
}
