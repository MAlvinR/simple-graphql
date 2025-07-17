import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

const notes = [
    { id: "1", title: "Pada suatu hari...", body: "Lorem ipsum dolor sit amet :)" },
    { id: "2", title: "iseng buat judul", body: "Lorem ipsum dolor sit amet :)" },
];

const typeDefs = `
    type Query {
        getAllNotes: [Note]
        getNoteByID(id: ID!): Note
    }

    type Mutation {
        createNote(title: String!, body: String!): Note
        updateNote(id: ID!, title: String, body: String): Note
        deleteNote(id: ID!): Note
    }

    type Note {
        id: ID
        title: String
        body: String
    }
`;

const resolvers = {
    Query: {
        getAllNotes: () => notes,
        getNoteByID: (_, { id }) => notes.find(note => note.id === id),
    },
    Mutation: {
        createNote: (_, { title, body }) => {
            const newNote = {
                id: (notes.length + 1).toString(),
                title,
                body,
            }
            console.log(newNote);
            notes.push(newNote);
            return newNote;
        },
        updateNote: (_, { id, title, body }) => {
            const noteIndex = notes.findIndex(note => note.id === id);
            if (noteIndex === -1) return null;

            if (title !== undefined) notes[noteIndex].title = title;
            if (body !== undefined) notes[noteIndex].body = body;

            return notes[noteIndex];
        },
        deleteNote: (_, { id }) => {
            const noteIndex = notes.findIndex(note => note.id === id);
            if (noteIndex === -1) return null;
            
            const deletedNote = notes[noteIndex];
            notes.splice(noteIndex, 1);
            return deletedNote;
        }
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});

console.log(`sekarang server sudah live di: ${url}`);