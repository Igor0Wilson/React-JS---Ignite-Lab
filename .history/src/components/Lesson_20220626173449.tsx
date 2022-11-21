import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type: "live" | "class";
}

export function Lessons(props: LessonProps){
    const { slug } = useParams<{slug: string}>();

    const isLessonsAvailable = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "EEEE' * 'd' de ' MMMM ' * ' k 'h' mm", {
        locale: ptBR
    })

    const isActiveLessons = slug === props.slug;

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span className="text-gray-300">
                {availableDateFormatted}  
            </span>

            <div className={classNames("rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",{ 
                "bg-green-500": isActiveLessons,
                })}
            >
                <header className="flex items items-baseline justify-between">
                    {isLessonsAvailable ? (
                        <span className="text-sm text-blue-500 font-medium flex items-center gap-2">
                        <CheckCircle size={20}/>
                        Conteúdo liberado
                    </span>
                    ) : (
                    <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                        <Lock size={20}/>
                        Em Breve
                    </span>
                    )}

                    <span className="text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold">
                        {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA" }
                    </span>
                </header>

                <strong className={classNames(" mt-5 block", {
                    "text-white" : isActiveLessons,
                    "text-gray-200": !isActiveLessons
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}