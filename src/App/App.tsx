import React, {useState} from 'react';
import './App.css';
import CardList from "../components/AllCards/CardList"
import { ICard } from "../types/types"
import getNewImages from "../RequestMethods/getNewImages";

let arrRequest:Array<ICard>=[]

function App() {
    console.log("запущено")

    const [images,setImages] = useState<Array<ICard>>([]);
    const [currentPage,setCurrentPage] = useState<number>(1);
    const [fetching,setFetching] = useState<boolean>(true);

    React.useEffect(() => {
        getNewImages<ICard[]>(currentPage.toString()).then(
            (data) => {
                arrRequest=data
                setImages(images.concat(arrRequest))
            }
        )
    }, [fetching]);

    const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setFetching(!fetching)
        setCurrentPage(currentPage+1)
    };

    return (
          <div className="intro">
              <div className="maincontant">
                  <div className="cardcontainer">
                          <CardList items={images} />
                  </div>
              </div>
              <div className="footer">
                  <button onClick={buttonHandler} className="footerbutton"  > Загрузить ещё</button>
              </div>
          </div>
    );
}

export default App;
