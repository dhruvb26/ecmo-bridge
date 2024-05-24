import Link from "next/link";
import { Badge } from "~/components/ui/badge";
export function AboutComponent() {
  return (
    <section className="rounded-lg bg-white py-10 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-left md:max-w-lg md:text-center lg:max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl lg:leading-tight">
            A project developed by{" "}
            <span className="relative inline-block">
              <span className="absolute bottom-1.5 inline-block h-2 w-full bg-primary-purple-400"></span>
              <span className="relative"> EPICS@ASU. </span>
            </span>
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 md:mt-20 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Why did we create this project?
            </h3>
            <p className="mt-4 text-gray-700">
              The main goal of this project is to streamline the process of
              finding the best ECMO match for your patient. We understand that
              medical resources like ECMO are scarce and we want to make sure
              every patient in need gets the best care possible.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">
              Who helped us along the way?
            </h3>
            <p className="mt-4 text-gray-700">
              This project was initiated by EPICS@ASU. A team of 5 have been
              working on this project along with the help of our community
              partner, Dr. Sumedha Attanti from Mayo Clinic.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Why don't we let you update hospital information?
            </h3>
            <p className="mt-4 text-gray-700">
              Due to safety and ethical concerns, we have decided to restrict
              the user from updating hospital information. This would prevent
              any misuse of the feature. If you have any concerns, please
              contact us directly.
            </p>

            <h3 className="mt-8 text-lg font-semibold text-gray-900">
              Have a question?
            </h3>
            <span className="mt-4  text-gray-700">
              Feel free to reach out to us at{" "}
            </span>

            <Link
              className="text-primary-purple-900 hover:text-primary-purple-400 hover:underline"
              href={
                "https://mail.google.com/mail/?view=cm&fs=1&to=amras@asu.edu"
              }
            >
              amras@asu.edu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
