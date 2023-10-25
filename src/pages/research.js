import React from "react";
import { graphql } from "gatsby";
import '../styles/coursehist.css'

export const query = graphql`
    query MyQuery {
        allCoursehistCsv {
        nodes {
            player_name
            dk_salary
            draftkings
            total_rounds
            sg_mean
            _2022
            _2021
            _2020
            _2019
            _2018
        }
        }
    }
`;

// Determine the minimum and maximum values in the data
/*
const values = query.allCoursehistCsv.nodes.map(node => node.value)
const minValue = Math.min(values)
const maxValue = Math.max(values)


// Create a color scale from blue to red
const colorScale = (value) => {
    const minHue = 0 // blue
    const maxHue = 255 // red
    const hue = ((value - minValue) / (maxValue - minValue)) * (maxHue - minHue) + minHue
    return `hsl(${hue}, 100%, 50%)`
}
*/


const TableData = ({ data }) => {

    const courseNodes = data.allCoursehistCsv.nodes;

    return(
        <div>
                <table className="data-table">
                    <caption className="top">THE RIVIERA COUNTRY CLUB - COURSE HISTORY</caption>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>DK Salary</th>
                            <th>DK Odds</th>
                            <th>Rounds</th>
                            <th>SG AVG</th>
                            <th>2022</th>
                            <th>2021</th>
                            <th>2020</th>
                            <th>2019</th>
                            <th>2018</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseNodes.map(node => (
                            <tr key={node.id}>
                                <td>{node.player_name}</td>
                                <td>${node.dk_salary}</td>
                                <td>+{node.draftkings}</td>
                                <td>{node.total_rounds}</td>
                                <td>{node.sg_mean === "NA" ? "" : node.sg_mean}</td>
                                <td style={{ 
                                    borderLeft: "2px solid rgba(0, 0, 0, 1)",
                                    backgroundColor: node._2022 === "NA" ? "transparent" :
                                    node._2022 === "CUT" ? "#54436B": 
                                    node._2022 === "DQ" ? "#54436B":
                                    node._2022 === "1" ? "#D4AF37" : "#50CB93",
                                    color: "white"}}>{node._2022 === "NA" ? "" : node._2022}</td>
                                <td style={{ 
                                    backgroundColor: node._2021 === "NA" ? "transparent" :
                                    node._2021 === "CUT" ? "#54436B": 
                                    node._2021 === "DQ" ? "#54436B":
                                    node._2021 === "1" ? "#D4AF37" : "#50CB93",
                                    color: "white"}}>{node._2021 === "NA" ? "" : node._2021}</td>
                                <td style={{ 
                                    backgroundColor: node._2020 === "NA" ? "transparent" :
                                    node._2020 === "CUT" ? "#54436B": 
                                    node._2020 === "DQ" ? "#54436B":
                                    node._2020 === "1" ? "#D4AF37" : "#50CB93",
                                    color: "white"}}>{node._2020 === "NA" ? "" : node._2020}</td>
                                <td style={{ 
                                    backgroundColor: node._2019 === "NA" ? "transparent" :
                                    node._2019 === "CUT" ? "#54436B": 
                                    node._2019 === "DQ" ? "#54436B":
                                    node._2019 === "1" ? "#D4AF37" : "#50CB93",
                                    color: "white"}}>{node._2019 === "NA" ? "" : node._2019}</td>
                                <td style={{ 
                                    backgroundColor: node._2018 === "NA" ? "transparent" :
                                    node._2018 === "CUT" ? "#54436B": 
                                    node._2018 === "DQ" ? "#54436B":
                                    node._2018 === "1" ? "#D4AF37" : "#50CB93",
                                    color: "white"}}>{node._2018 === "NA" ? "" : node._2018}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
        </div>
    )
}

export default TableData
/*
export default function Research() {
    return (
        <div>
            <Header />
            <Container><h1>Yo</h1>
            <Table responsive bordered className="noWrap">
                <thead>
                <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto is the man that once was a man of men</td>
                    <td>@mdo</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                </tr>
                </tbody>
            </Table>
        </Container>
        </div>
    )
  }
  */