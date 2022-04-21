import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"

export default function Article() {
    const { id } = useParams()
    const resp = useFetch('./../data/db.json')
    let isPending = resp.isPending
    let error = resp.error
    let article = null

    const history = useHistory()

    useEffect(() => {
      if (resp.error) {
        setTimeout(() => {
          // history.goBack()
          history.push('/')
        }, 2000)
      }
    }, [resp.error, history])

    if (resp.data) {
        // fudging some of this because json server isn't working
        let articles = resp.data
        article = articles.filter(a => a.id === id)[0];

        if (!article) {
            resp.error = 404;
        }
    }


    return (
        <section>
            {isPending && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {article && (
                <div key={article.id}>
                    <h2>{article.title}</h2>
                    <p>By {article.author}</p>
                    <p>{article.body}</p>
                </div>
            )}
      </section>
    )
}