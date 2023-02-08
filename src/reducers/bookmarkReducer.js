import { createStore } from "redux"

const bookmarkReducer = (state = [], action) => {
    if(action.type === "@bookmark/add") {
        if (state.length >= 5) {
            return state
        }
        return [...state, action.payload];
    }

    if(action.type === "@bookmark/remove") {
        const {id} = action.payload;
        let bookmarkList = [];
        state.map(bookmark => {
            if (bookmark.id !== id) {
                bookmarkList.push(bookmark);
            }
            return bookmark;
        })
        return bookmarkList
    }

    return state
}

export const createBookmark = character => {
    return { 
        type: '@bookmark/add',
        payload: {
            image: character.image,
            name: character.name,
            id: character.id
        }
    }

}

export const removeBookmark = character => {
    return { 
        type: '@bookmark/remove',
        payload: {
            id: character.id
        }
    }
}

export const store = createStore(bookmarkReducer)
