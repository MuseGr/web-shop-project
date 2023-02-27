import './category-container.styles.scss'

import CategoryItem from '../category-item/category-item'

const CategoiesContainer = ({categories}) => {
    return(
      <div className="categories-container">
        {categories.map((category) => {
          return(
            <CategoryItem key={category.id} category = {category}/>
          )
        })}
    </div>
    )
}

export default CategoiesContainer