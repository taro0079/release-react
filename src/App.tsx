import { useEffect, useState } from 'react'
import './App.css'
import rpstLogo from '/rpst.svg'
import { motion } from 'framer-motion'
import Button from './components/Button/Button'
import Card from './components/Card/Card'
import PokeLoad from './components/PokeLoad/pokeLoad'
import { PokemonResponse } from './types'
import getPokemon from './utils/pokeFetch'
import PokeLoader from './components/PokeLoader/PokeLoader'

type Author = {
  name: string
  email: string
  date: Date
}

type Commit = {
  author: Author
  message: string
}
type CommitData = {
  commit: Commit
}

const copyToClipboard = (text: string) => {
  try {
    navigator.clipboard.writeText(text)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message)
    }
  }
}
const preloadImage = (url: string | undefined) => {
  if (url == undefined) {
    return;
  }
  const img = new Image()
  img.src = url;
}

const App = () => {
  const [data, setData] = useState<string[] | null>(null)
  const [editedData, setEditedData] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [extractData, setExtractData] = useState<(number | null)[]>([])
  const [copied, setCopied] = useState<boolean>(false)
  const [prNumber, setPrNumber] = useState<number>(0)
  const [poke, setPoke] = useState<PokemonResponse | null>(null)
  const url =
    import.meta.env.VITE_GITHUB_URL + 'pulls/' + prNumber + '/commits'

  useEffect(() => {
    const fetchPoke = async () => {
      const data = await getPokemon()
      setPoke(data)
    }
    fetchPoke()
  }, [])
  preloadImage(poke?.sprites.front_default);




  const handleCopyButton = () => {
    copyToClipboard(extractData.join(','))
    setCopied(true)
  }

  const fetchData = async () => {
    setError(null)
    if (prNumber === 0) {
      setError('PRの番号を0以外で入力してね')
      return
    }
    setLoading(true)
    try {
      const response = await fetch(url, {
        headers: {
          Authorization:
            'Bearer ' + import.meta.env.VITE_GITHUB_API_KEY,
        },
      })
      if (!response.ok) {
        throw new Error('Response is Error!')
      }
      const responseData: CommitData[] = await response.json()
      const result = responseData.map((data) => {
        return data.commit.message
      })
      setData(result)
      setEditedData(result?.join('\n'))
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }
  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedData(event.target.value)
  }
  const handlePrInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrNumber(Number(event.target.value))
  }
  const extractTicketNumber = (text: string) => {
    const textArray = text.split('\n')
    const extracts = textArray.map((message) => {
      const match = message.match(/^#(\d+)/)
      return match ? Number(match[1]) : null
    })
    return extracts.filter((element) => element != null)
  }

  const handleExtractButtonClick = () => {
    const ticketNumber = extractTicketNumber(editedData)
    setExtractData(ticketNumber)
  }
  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 100 },
  }
  return (
    <motion.div
      transition={{ ease: 'easeOut', duration: 1 }}
      initial="hidden"
      animate="visible"
      variants={item}
    >
      <div>
        <img src={rpstLogo} />
        <h1>りりーすつーる べーたばん</h1>
      </div>
      <div className="staging">
        <p>PRの番号をいれて</p>
        <input onChange={handlePrInputChange}></input>
        <Button onClick={fetchData}>Fetch Data</Button>
      </div>

      {/*{loading && <PokeLoad } */}
      {loading && poke && <PokeLoader pokemon={poke} />}

      {error && <p>Error: {error}</p>}
      {data &&
        data.map((d, i) => (
          <motion.p
            key={i}
            style={{ textAlign: 'left' }}
            transition={{
              ease: 'easeOut',
              duration: 1,
            }}
            initial="hidden"
            animate="visible"
            variants={item}
          >
            {d}
          </motion.p>
        ))}
      {data && (
        <motion.div
          className="section"
          transition={{
            ease: 'easeOut',
            duration: 1,
          }}
          initial="hidden"
          animate="visible"
          variants={item}
        >
          ↓以下で編集↓
          <textarea
            value={editedData}
            rows={20}
            onChange={handleTextAreaChange}
          />
          <Button onClick={handleExtractButtonClick}>
            チケット番号 抽出
          </Button>
          {extractData.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '40px',
              }}
            >
              <div>
                <p>チケット番号</p>
                <p>{extractData.join(',')}</p>
              </div>
              <div className="copy-container">
                <Button onClick={handleCopyButton}>Copy</Button>
                {copied && <Card>こぴーした！</Card>}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </motion.div>
  )
}

export default App
