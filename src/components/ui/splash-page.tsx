import { House } from "lucide-react";

export default function SplashPage() {
  return (
    <div className="flex w-[60%] flex-col gap-10">
      <h1 className="flex items-end text-6xl font-thin">
        decoh
        <House className="size-14" />r
      </h1>
      <section>
        <h2 className="text-2xl font-bold">what it is</h2>
        <p>
          decohr is a tool that helps you find the perfect home decor for your
          space. at the moment, it is a tool that will help you determine your
          taste profile and generate images based your profile.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold">how it works</h2>
        <ol className="flex flex-col gap-2">
          <li>
            you will be shown a series of images and you can either like or
            dislike them.
          </li>
          <li>
            once you hit five images you can generate your taste profile, which
            will be determined based off the top three styles you like the most.
          </li>
          <li>
            generate images based off your taste profile to get some inspiration
            of what your space will look like.
          </li>
        </ol>
      </section>
      <aside>
        <p>
          have any suggestions? hate the name? send them to me{" "}
          <a
            href="mailto:allamasaid@gmail.com"
            className="text-[#55828b] underline"
          >
            here
          </a>
          .
        </p>
      </aside>
    </div>
  );
}
