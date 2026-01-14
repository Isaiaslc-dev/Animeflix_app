import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID)

const database = new Databases(client)

export const updateSearchCount = async (searchTerm, anime) => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.equal('searchTerm', searchTerm)]
    )

    if (result.documents.length > 0) {
      const doc = result.documents[0]
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        doc.$id,
        { count: doc.count + 1 }
      )
    } else {
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm,
          count: 1,
          anime_id: anime.mal_id, 
          title: anime.title_english || anime.title || "Unknown",
          poster_url: anime.images?.jpg?.large_image_url || '/No-Poster.png',
        }
      )
    }
  } catch (error) {
    console.error('Erro ao atualizar:', error)
  }
}

export const getTrendingAnimes = async () => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(5), Query.orderDesc('count')]
    )
    return result.documents
  } catch (error) {
    return []
  }
}