type StateType = {
  age: number
  childrenCount: number
  name: string
}
type ActionType = {
  type: string
  [key: string]: any
}

// меня вызовут и дадут мне стейт (почти всегда объект)
// и инструкцию (action, тоже объект)
// согласно прописанному type в этом action (инструкции) я поменяю state
export const userReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'INCREMENT-AGE':
      // решение через переменную
      // let newState = { ...state }
      // newState.age = state.age + 1
      // return newState

      // решение в одну строчку без переменной
      return { ...state, age: state.age + 1 }
    case 'INCREMENT-CHILDREN-COUNT':
      // решение через переменную
      // let newState2 = { ...state }
      // newState2.childrenCount = state.childrenCount + 1
      // return newState2

      // решение в одну строчку без переменной
      return { ...state, childrenCount: state.childrenCount + 1}
    case 'CHANGE-NAME':
      // let newSate3 = { ...state }
      // newSate3.name = state.name = 'Viktor'
      // return newSate3

      return { ...state, name: state.name = 'Viktor'}
    default:
        return state
  }
}
