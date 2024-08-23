import { Link, useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()

  console.log(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-2 text-xl">Ooops!</h1>
      <p className="text-neutral-400">
        Sorry, an unexpected error has occurred.
      </p>
      <div className="py-8">
        <Link
          to="/"
          className="text-neutral-400 underline hover:text-neutral-100"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
