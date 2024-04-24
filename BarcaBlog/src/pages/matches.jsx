import { useState, useEffect } from 'react';
import logo1 from '../assets/logo1.png';
import '../styles/matches.css'

const Match = ({ match }) => {
    return (
        <div>
        <div className="container_match">
            <div class="match-info">
                <div>{match.fecha}</div>
                <img class="team-logo" src={match.LogoLocal} alt="Logo Equipo Local"/>
                <span class="team-name">{match.EquipoLocal}</span>
                <span class="score">{match.marcador_local}</span>
                <span class="separator">-</span>
                <span class="score">{match.marcador_visit}</span>
                <span class="team-name">{match.EquipoVisitante}</span>
                <img class="team-logo" src={match.LogoVisitante} alt="Logo Equipo Visitante"/>
                <div>{match.competencia_id}</div>
                <div>{match.jornada}</div>
                <div>{match.estadio_local}</div>
            </div>
        </div>
        <br></br>
        </div>
    );
};

const ViewMatches = () => {
    const [matches, setMatches] = useState([]);

    async function fetchMatches() {
        try {
            const response = await fetch('http://localhost:3000/matches');
            const matches_json = await response.json();
            setMatches(matches_json);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchMatches();
    }, []);

    return (
        <div>
            <header>
                <div className="ImgBanner">
                    <center>
                        <img src={logo1} className="LogoHeader" alt="Logo" />
                    </center>
                </div>
            </header>
            {matches.map(match => <Match key={match.id} match={match} />)}
        </div>
    );
};

export default ViewMatches;
