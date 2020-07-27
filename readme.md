
### Enable ingress nginx:
```bash
minikube addons enable ingress
```

### Expose ingress in minikube:

```bash
kubectl expose deployment ingress-nginx-controller --target-port=80 --type=ClusterIP -n kube-system
service/ingress-nginx-controller exposed
```

### Create secrets:
```bash
kubectl create secret generic <secret-name> --from-literal=<KEY>=<VALUE>
```
