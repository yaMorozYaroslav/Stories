'use client'
import React from 'react'
import {useItemContext} from '../../context/items/ItemState'
import {useSeedContext} from '../../context/seeds/SeedState'
import { usePathname } from 'next/navigation'

export const ListCleaner =()=> {
	const {seeds,resetSeeds} = useSeedContext()
	const {items, resetItems} = useItemContext()
	const pathname = usePathname()
	
	const isSeed = pathname === '/seed-list'
	const isItem = pathname === '/item-list'
	//console.log(seeds.data && seeds.data.length)
	
	React.useEffect(()=>{
		            if(!isSeed&&seeds.data)resetSeeds()
		            if(!isItem&&items.data)resetItems()},[isSeed])
	
	return null
	}

	
	