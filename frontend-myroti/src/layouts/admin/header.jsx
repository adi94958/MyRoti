import React from 'react'
import { DASHBOARD_SIDEBAR_LINKS} from './dataAdmin'
import { Link } from 'react-router-dom';

export default function Header() {

	return (
		<div className="bg-grey-300 h-16 px-4 flex items-center border-b border-gray-200 justify-end">
			<div className="flex justify-end">
                <h1 className='text-2xl font-extrabold'>Hey, Admin</h1>
		    </div>
		</div>
	)
}
