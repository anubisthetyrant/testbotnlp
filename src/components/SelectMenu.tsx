import "./select_menu.css"

type Props = {
    items: string[]
    onSelect: (value: string) => void
}

const SelectMenu = ({items, onSelect}: Props) => {
  return (
    <ul className="s-menu">
        {items.map((item, index) => <li className="s-menu-items" key={index} onClick={() => onSelect(item)}>{item}</li>)}
    </ul>
  )
}

export default SelectMenu