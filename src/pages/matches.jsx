import { useState, useEffect } from 'react';
import '../styles/matches.css'

import useNavigate from "@hooks/useNavigate"
import useApi from "@hooks/useApi"

import Actions from "@components/Actions.jsx"

const Match = ({ match }) => {
    return (
        <div>
            <div className="container_match">
                <div className="match-info">

                    <table id="miTabla">
                        <tbody>
                            <tr>
                                <td rowSpan={2}>
                                    <img src={match.matchInfo.logoIMG} className="left-image"></img>
                                </td>
                                <td>
                                    <span className='center-texts'>{match.matchInfo.competencia}</span>
                                </td>
                                <td>
                                <span className="right-texts">
                                        {
                                        new Date(match.fecha).toDateString() === new Date().toDateString() ? 'HOY - ': ''
                                        }
                                        {
                                            new Date(match.fecha).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
                                        }
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td><span className='center-texts'>{match.jornada}</span></td>
                                <td><span className="right-texts">{match.EstadioLocal}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    
                    <div className="container_match_body">
                        <div className="container-team">
                            <img className="team-logo" src={match.LogoLocal} alt="Logo Equipo Local" style={{width:'5vw'}}/>
                            <span className="team-name">{match.EquipoLocal}</span>
                        </div>
                        <div className="container-marcador">
                        {match.marcador_local !== null ? (
                            <>
                                <span className="score">{match.marcador_local}</span>
                                <span className="separator">-</span>
                                <span className="score">{match.marcador_visit}</span>
                            </>
                        ) : (
                            <span className="score">TBD</span>
                        )}
                        </div>
                        <div className="container-team">
                            <img className="team-logo" src={match.LogoVisitante} alt="Logo Equipo Visitante" style={{width:'5vw'}}/>
                            <span className="team-name">{match.EquipoVisitante}</span>
                        </div>
                    </div>
                </div>
                
                <div className="container-actions">
                <Actions local_id={match.local_id} visit_id={match.visit_id} match_id={match.partidoID}/>
                </div>

            </div>
            <br></br>
        </div>
    );
};

const ViewMatches = () => {
    const [match, setMatches] = useState([]);
    const { navigate } = useNavigate();

    const api_dir = import.meta.env.VITE_API_DIR;
    const matchesUrl = `${api_dir}/matches`;
    const competenciasUrl = `${api_dir}/competencias`;

    const { data: listadoMatches, loading: matchesLoading, error: matchesError } = useApi(matchesUrl);
    const { data: listadoCompetencias, loading: competenciasLoading, error: competenciasError } = useApi(competenciasUrl);

    useEffect(() => {
        if (!matchesLoading && !competenciasLoading) {
            if (matchesError || competenciasError) {
                console.error("Error al cargar los datos:", matchesError || competenciasError);
                if (matchesError === "Token de acceso vencido" || competenciasError === "Token de acceso vencido") {
                    navigate("/login");
                }
            } else {
                const combinedData = listadoMatches.map(match => {
                    const matchInfo = listadoCompetencias.find(competencia => competencia.id === match.competencia_id);
                    
                    return { ...match, matchInfo };
                });
                //Ordenar por fecha
                combinedData.sort((a, b) => {
                    const dateA = new Date(a.fecha);
                    const dateB = new Date(b.fecha);

                    return dateB - dateA;

                });
                setMatches(combinedData);

                //Encontrar primer evento con fecha cercana
                const fechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
                let eventoCercanoIndex = combinedData.findIndex(evento => new Date(evento.fecha) > fechaActual);
                if (eventoCercanoIndex === -1) {
                    eventoCercanoIndex = combinedData.length - 1; // Si no hay eventos futuros, muestra el último evento (el más reciente)
                }
                window.scrollTo(0, eventoCercanoIndex * 23); 

            }
        }
    }, [listadoMatches, listadoCompetencias, matchesLoading, competenciasLoading, matchesError, competenciasError, navigate]);

    return (
        <div>
            {match.map(match => <Match key={match.partidoID} match={match} matchInfo={match.matchInfo} />)}
        </div>
    );
    
};

export default ViewMatches