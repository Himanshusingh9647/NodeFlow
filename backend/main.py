
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Node(BaseModel):
    id: str
    data: Dict[str, Any] = {}

class GraphData(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
async def parse_pipeline(graph: GraphData):
    nodes = graph.nodes
    edges = graph.edges
    num_nodes = len(nodes)
    num_edges = len(edges)

    # Build adjacency list and in-degree count
    adj = {node.id: [] for node in nodes}
    in_degree = {node.id: 0 for node in nodes}
    for edge in edges:
        adj[edge.source].append(edge.target)
        in_degree[edge.target] += 1

    # Kahn's algorithm for DAG check
    queue = [nid for nid, deg in in_degree.items() if deg == 0]
    visited = 0
    while queue:
        curr = queue.pop(0)
        visited += 1
        for neighbor in adj[curr]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    is_dag = visited == num_nodes

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
