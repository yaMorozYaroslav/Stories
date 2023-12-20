'use client'
import React from 'react'
import Link from 'next/link'
import FileBase from 'react-file-base64'
import { usePathname } from 'next/navigation';
import {useSeedContext} from '../../../context/seeds/SeedState'
import {useItemContext} from '../../../context/items/ItemState'
import {useQueryContext} from '../../../context/queries/QueryState'
import * as S from './add-form.styled'
import revalidator from '../revalidator'
import {seedTypes, itemTypes} from '../select-types'
import {useLocale} from 'next-intl'

const initialState = {title: '', description: '', price: '', 
	                  category: '', type: '', photo: ''}

export function AddForm({setOpen, currItem, setCurrItem}){
	
	const locale = useLocale()
	const pathname = usePathname()
	const isSeed = pathname === `/${locale}/seed-list`
	
	const {addSeed, updateSeed, fetchSeeds} = useSeedContext()
	const {addItem, updateItem, fetchItems} = useItemContext()
	const {state} = useQueryContext()
	
	const ref = React.useRef()
	const [source, setSource] = React.useState(initialState)
   
   const fetcher =()=> isSeed?fetchSeeds(state):fetchItems(state)
   
    let categories
    if(isSeed){ categories = ['', 'flowers', 'vegies', 'seedlings']
	}else{categories = ['', 'soils', 'supplements', 'equipment']}
    
    React.useEffect(()=>{		
	       	   if(currItem._id)setSource(currItem)       
	       },[currItem])

    const reset =()=> {	
		setCurrItem({})
		setSource(initialState)
		ref.current.reset()
		}
		
		       
     let currType
	{categories.map((category,i) => {
		            if(source.category===category&&category.length){
						           currType = Object.values(
		                           !isSeed?itemTypes:seedTypes)[isSeed?i-1:i-1]}})}
   
	
		
	const handChange =(e)=> setSource({...source, [e.target.name]: e.target.value})
	
	const changeBorder =(e)=> {
			e.target.style.border = '2px solid purple'
			setTimeout(() => e.target.style.border = null, 1000)
			}
	
	const handClose =(e)=> {e.preventDefault();setOpen(false);}
	
	const handSubmit =(e)=> {
		e.preventDefault()
	if(isSeed){if(!source._id){addSeed(source)		           
	          }else{updateSeed(source._id, source)}
			 
   }else{if(!source._id){addItem(source)		           
	          }else{updateItem(source._id, source)}  }
        reset()
	    setOpen(false)
		     setTimeout(() => {
					alert('Element has been '+
	                      (!source._id?'added.':'updated.'))},1000)
	    fetcher()
	    revalidator()
		        }
	 return(
	<S.ExtraCont>
	 <S.Container>
	 
	 <S.Title>{!isSeed?'Item':'Seed'}</S.Title>
	<S.Form onSubmit={handSubmit} ref={ref}>
	
	 <label>Title:</label>
	 <S.Input name='title' 
	          value={source.title}    
	          onChange={handChange}
	                     required/><br/>
	 
	 <label>Description:</label><br/>
	 <S.Textarea name='description'
	              value={source.description} 
	              onChange={handChange}
	                              required/><br/>
	 
	 <label>Price:</label>
	 <S.Input name='price'
	        value={source.price}
	        onChange={e=>setSource(
				          {...source,
						   price: Number(e.target.value)||0})}
	                                               required/>$<br/>
	 
	 <label>Category:</label>
	 <S.Category name='category'
	         value={source.category}
	         onChange={handChange} >
	{categories.map((item, i) => <option key={i} value={item}>{item}</option>)}
	 </S.Category><br/>
	 
	 <label>Type:</label>
	 <S.Category name='type'
	         value={source.type}
	         onChange={handChange}
	          >
	     {currType && currType.map((item,i) => 
			   <option key={i} value={item}>{item}</option>)}
	 </S.Category><br/>
	
	  <div className='file-base'>
	   <label>Photo: </label><br/>
      <FileBase          
                         type="file"
                         multiple={false}
                         onDone={({base64})=>setSource({
                            ...source, photo: base64})}/><br/></div>
                            
	     <S.Submit onMouseOver={changeBorder} type='submit'>Save</S.Submit>
	     <S.Close onMouseOver={changeBorder} 
	              onClick={handClose}>CloseForm</S.Close>
	
	   </S.Form>
	 </S.Container>
	</S.ExtraCont>
	 )
	}
