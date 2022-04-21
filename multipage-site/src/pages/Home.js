import { useFetch } from '../hooks/useFetch'
import { Link } from 'react-router-dom'

// styles
import './Home.css'

export default function Home() {
  const { data: articles, isPending, error } = useFetch('./data/db.json')
  const resp = useFetch('./data/db.json')
  console.log('resp', resp)

return (
    <section className="home">
      <h2>Articles</h2>
      {isPending && <p>Loading&hellip;</p>}
      {error && <p>{error}</p>}
      <ul className="card-list">
        {articles && articles.map(article => (
            <li key={article.id} className="card">
                <Link to={`/articles/${article.id}`}>
                    <h3>{article.title}</h3>
                    <p>Written by {article.author}</p>
                </Link>
            </li>
        ))}
      </ul>

    </section>
  )
}