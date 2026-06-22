import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

const transformArrayToObject = array => {
  return array.reduce((acc, item) => {
    acc[item.value] = item.title
    return acc
  }, {})
}

//options schema = [{title: string, value: string}]

const Select = ({
  label,
  options,
  multiple,
  placeholder,
  name,
  setSelectValue,
  hasSearch,
  choosedParams,
}) => {
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [filteredItems, setFilteredItems] = useState(options)
  const [selectedItems, setSelectedItems] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [value, setValue] = useState(placeholder)
  const customSelect = useRef(null)
  const customSelectSearch = useRef(null)

  useEffect(() => {
    if (Object.keys(choosedParams).length === 0) {
      setValue(placeholder)
      return
    }

    const selectedLabel = transformArrayToObject(options)[choosedParams[name]]

    if (!selectedLabel) {
      setValue(placeholder)
      return
    }
    setValue(selectedLabel)
  }, [choosedParams])

  const selectToggle = e => {
    e.preventDefault()
    if (open) {
      setClosing(true)
      // setTimeout(function () {
      setOpen(false)
      // }, 500);
    } else {
      setClosing(false)
      setOpen(true)
      // setTimeout(() => {
      hasSearch && customSelectSearch.current.focus()
      // }, 100);
    }
  }

  const close = () => {
    setClosing(true)
    // setTimeout(function () {
    setOpen(false)
    // }, 500);
  }

  const closeOnOutside = e => {
    if (
      customSelect.current &&
      open &&
      !customSelect.current.contains(e.target)
    ) {
      close()
    }
  }

  const search = e => {
    const value = e.target.value
    const regex = new RegExp(value, 'gmi')

    setSearchValue(value)

    if (value.length > 0) {
      const newFilteredItems = options.filter(
        ({ title }) => title.search(regex) !== -1
      )
      setFilteredItems(newFilteredItems)
      setNoResults(newFilteredItems.length <= 0)
    } else {
      setFilteredItems(options)
      setNoResults(false)
    }
  }

  const onChange = e => {
    if (multiple) {
      if (e.target.checked) {
        setSelectedItems([...selectedItems, e.target.value])
        setSelectValue([...selectedItems, e.target.value])
      } else {
        const newSelectedItems = selectedItems.filter(
          item => item !== e.target.value
        )
        setSelectedItems(newSelectedItems)
        setSelectValue(newSelectedItems)
      }
    } else {
      setValue(e.target.value)
      setSelectValue({ [e.target.name]: e.target.dataset.keyValue })
      setSearchValue('')
      setFilteredItems(options)
      setNoResults(false)
      close()
    }
  }

  const removeItem = (e, value) => {
    e.preventDefault()
    e.stopPropagation()
    const newSelectedItems = selectedItems.filter(item => item !== value)
    setSelectedItems(newSelectedItems)
    setSelectValue(newSelectedItems)
  }

  const onDelete = e => {
    e.stopPropagation()
    setSelectValue({ [name]: undefined })
    setValue(placeholder)
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeOnOutside)

    return () => {
      document.removeEventListener('mousedown', closeOnOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customSelect, open])

  return (
    <div className={'custom-select-container'}>
      <label className="custom-select-label">{label}</label>
      <div
        ref={customSelect}
        className={`custom-select-block ${open ? 'opened' : ''} ${
          closing ? 'closed' : ''
        }`}
      >
        <div
          className={`custom-select__title ${
            value !== placeholder && value !== '' ? 'choosed' : ''
          }`}
          onClick={e => selectToggle(e)}
        >
          {multiple && selectedItems.length > 0 && (
            <>
              {selectedItems.map((item, index) => (
                <div key={index} className="custom-select__title-item">
                  <button
                    className="btn custom-select__title-item__remove"
                    onClick={e => removeItem(e, item)}
                  >
                    ×
                  </button>
                  <span>{item}</span>
                </div>
              ))}
              <div className="custom-select__title__search">
                <input
                  onChange={e => search(e)}
                  type="text"
                  value={searchValue}
                  ref={customSelectSearch}
                />
              </div>
            </>
          )}
          {multiple && selectedItems.length === 0 && (
            <div className="custom-select__title__search">
              <input
                onChange={e => search(e)}
                type="text"
                placeholder={placeholder}
                value={searchValue}
                ref={customSelectSearch}
              />
            </div>
          )}
          {!multiple && <>{value}</>}
          {value !== placeholder && value !== '' && (
            <div className="custom-select__title__remove" onClick={onDelete}>
              &#x2715;
            </div>
          )}
        </div>
        <div className="custom-select__dropdown">
          {!multiple && hasSearch && (
            <div className="custom-select__search">
              <input
                onChange={e => search(e)}
                type="text"
                placeholder="Search..."
                value={searchValue}
                ref={customSelectSearch}
              />
            </div>
          )}
          <div
            className={`${
              multiple ? 'custom-select__checkboxes' : 'custom-select__radios'
            }`}
          >
            {noResults && (
              <div className="custom-select__no-results">No Results...</div>
            )}
            {filteredItems &&
              filteredItems.length > 0 &&
              filteredItems.map(({ title, value: option_value }, index) => (
                <div
                  key={index}
                  className={`${
                    multiple
                      ? 'custom-select__checkbox'
                      : 'custom-select__radio'
                  }`}
                >
                  <label>
                    <input
                      type={multiple ? 'checkbox' : 'radio'}
                      name={name}
                      value={title}
                      data-key-value={option_value}
                      onChange={e => onChange(e)}
                      checked={
                        multiple
                          ? selectedItems.includes(title)
                          : value === title
                      }
                    />
                    <i></i>
                    <span>{title}</span>
                    <div className="bg"></div>
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Select
